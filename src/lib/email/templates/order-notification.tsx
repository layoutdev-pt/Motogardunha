import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderNotificationEmailProps {
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  customerAddress: string;
  customerNotes?: string;
  items: OrderItem[];
  total: number;
  orderDate: string;
}

export default function OrderNotificationEmail({
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  customerNotes,
  items,
  total,
  orderDate,
}: OrderNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova Encomenda de {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nova Encomenda</Heading>
          
          <Section style={section}>
            <Text style={sectionTitle}>Dados do Cliente</Text>
            <Text style={text}>
              <strong>Nome:</strong> {customerName}
            </Text>
            <Text style={text}>
              <strong>Telefone:</strong> {customerPhone}
            </Text>
            {customerEmail && (
              <Text style={text}>
                <strong>Email:</strong> {customerEmail}
              </Text>
            )}
            <Text style={text}>
              <strong>Morada:</strong> {customerAddress}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={sectionTitle}>Itens da Encomenda</Text>
            {items.map((item, index) => (
              <Row key={item.id} style={itemRow}>
                <Column>
                  <Text style={itemText}>
                    {index + 1}. {item.title}
                  </Text>
                  <Text style={itemDetails}>
                    Qtd: {item.quantity} × €{item.price.toFixed(2)} = €
                    {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={totalText}>
              <strong>Subtotal: €{total.toFixed(2)}</strong>
            </Text>
          </Section>

          {customerNotes && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Text style={sectionTitle}>Notas</Text>
                <Text style={text}>{customerNotes}</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Text style={footer}>
            Encomenda recebida em: {orderDate}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "20px 0",
  color: "#DC2626",
};

const section = {
  padding: "0 48px",
};

const sectionTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "12px",
};

const text = {
  fontSize: "14px",
  color: "#555",
  lineHeight: "24px",
  margin: "4px 0",
};

const itemRow = {
  marginBottom: "8px",
};

const itemText = {
  fontSize: "14px",
  color: "#333",
  margin: "0",
};

const itemDetails = {
  fontSize: "12px",
  color: "#666",
  margin: "4px 0 0 0",
};

const totalText = {
  fontSize: "18px",
  color: "#DC2626",
  textAlign: "right" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  color: "#8898aa",
  textAlign: "center" as const,
  padding: "0 48px",
};
