import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";
import { customers, invoices, revenue } from "./placeholder-data";

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = revenue;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestInvoices() {
  try {
    const findCustomer = (customerId: string) =>
      customers.find(({ id }) => id === customerId);
    const latestInvoices = invoices.reduce<
      Array<{
        id: string;
        amount: string;
        image_url: string;
        name: string;
        email: string;
      }>
    >((acc, invoice) => {
      const customer = findCustomer(invoice.customer_id);
      if (customer) {
        acc.push({
          id: invoice.customer_id,
          amount: formatCurrency(invoice.amount),
          image_url: customer.image_url,
          name: customer.name,
          email: customer.email,
        });
      }
      return acc;
    }, []);

    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // Helper function to sum amounts based on status
    const sumAmountByStatus = (status: "paid" | "pending") =>
      invoices.reduce(
        (sum, invoice) =>
          invoice.status === status ? sum + invoice.amount : sum,
        0
      );

    // Mimicking SQL queries with TypeScript
    const invoiceCountPromise = Promise.resolve({
      rows: [{ count: invoices.length }],
    });
    const customerCountPromise = Promise.resolve({
      rows: [{ count: customers.length }],
    });
    const invoiceStatusPromise = Promise.resolve({
      rows: [
        {
          paid: sumAmountByStatus("paid"),
          pending: sumAmountByStatus("pending"),
        },
      ],
    });

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? 0);
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? 0);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  try {
    const lowerQuery = query.toLowerCase();

    // Join invoices with customers
    const joinedInvoices = invoices.map((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id);
      return { ...invoice, customer };
    });

    // Filter
    const filteredInvoices = joinedInvoices.filter(
      (invoice) =>
        invoice.customer?.name.toLowerCase().includes(lowerQuery) ||
        invoice.customer?.email.toLowerCase().includes(lowerQuery) ||
        invoice.amount.toString().includes(lowerQuery) ||
        invoice.date.includes(lowerQuery) ||
        invoice.status.toLowerCase().includes(lowerQuery)
    );

    // Sort by date descending
    const sortedInvoices = filteredInvoices.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Paginate
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return sortedInvoices.slice(startIndex, endIndex);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const lowerQuery = query.toLowerCase();

    const matchedData = invoices.filter((invoice) => {
      const customer = customers.find((c) => c.id === invoice.customer_id);

      if (!customer) return false;

      return (
        customer.name.toLowerCase().includes(lowerQuery) ||
        customer.email.toLowerCase().includes(lowerQuery) ||
        invoice.amount.toString().includes(lowerQuery) ||
        invoice.date.toLowerCase().includes(lowerQuery) ||
        invoice.status.toLowerCase().includes(lowerQuery)
      );
    });

    const totalPages = Math.ceil(Number(matchedData.length) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const invoice = invoices
      .map(({ status, customer_id, amount }) => ({
        id: customer_id,
        customer_id,
        status: status as "pending" | "paid",
        amount: amount / 100,
      }))
      .find((invoice) => invoice.customer_id === id);

    return invoice || ({} as InvoiceForm);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const filteredAndSortedCustomers = customers
      .filter((customer) => customer.name) // Example filter: only customers with names
      .sort((a, b) => a.name.localeCompare(b.name));

    return filteredAndSortedCustomers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
