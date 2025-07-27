import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#1F2937",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#111827",
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 1.5,
    color: "#4B5563",
  },
  highlightBlue: {
    color: "#60A5FA",
    fontWeight: "bold",
  },
  highlightPurple: {
    color: "#A78BFA",
    fontWeight: "bold",
  },
  highlightPink: {
    color: "#F472B6",
    fontWeight: "bold",
  },
  tableContainer: {
    border: "1 solid #D1D5DB",
    borderRadius: 4,
    padding: 10,
  },
  columnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    backgroundColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "2 solid #6B7280",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "1 solid #E5E7EB",
  },
  column: {
    width: "23%",
  },
  descriptionColumn: {
    width: "31%",
  },
});

const TransactionPDF = ({ transactions }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>SmartLog</Text>
      <Text style={styles.subtitle}>
        Transform your financial future with <Text style={styles.highlightBlue}>AI-powered insights</Text>, <Text style={styles.highlightPurple}>beautiful visualizations</Text>, and{" "}
        <Text style={styles.highlightPink}>smart automation</Text>.
      </Text>
      <View style={styles.tableContainer}>
        <View style={styles.columnHeader}>
          <Text style={styles.column}>Date</Text>
          <Text style={styles.descriptionColumn}>Description</Text>
          <Text style={styles.column}>Type</Text>
          <Text style={styles.column}>Amount</Text>
        </View>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.column}>{transaction.date || "-"}</Text>
            <Text style={styles.descriptionColumn}>{transaction.note ? transaction.note : "N/A"}</Text>
            <Text style={styles.column}>{transaction.type}</Text>
            <Text style={styles.column}>₹ {Number(transaction.amount).toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default TransactionPDF;
