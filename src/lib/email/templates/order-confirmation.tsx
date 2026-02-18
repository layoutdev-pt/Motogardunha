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
  Link,
} from "@react-email/components";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderConfirmationEmailProps {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
}

export default function OrderConfirmationEmail({
  customerName,
  customerPhone,
  customerAddress,
  items,
  total,
}: OrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Encomenda Recebida - Motogardunha</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Obrigado pela sua encomenda!</Heading>
          
          <Section style={section}>
            <Text style={greeting}>Olá {customerName},</Text>
            <Text style={text}>
              Recebemos o seu pedido de encomenda. A nossa equipa irá contactá-lo
              brevemente através do número <strong>{customerPhone}</strong> para
              confirmar a disponibilidade e detalhes de entrega.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={sectionTitle}>Resumo da Encomenda</Text>
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
            <Text style={totalText}>
              <strong>Subtotal: €{total.toFixed(2)}</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={sectionTitle}>Os Seus Dados de Contacto</Text>
            <Text style={text}>
              <strong>Telefone:</strong> {customerPhone}
            </Text>
            <Text style={text}>
              <strong>Morada:</strong> {customerAddress}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Text style={text}>
              Se tiver alguma questão, não hesite em contactar-nos:
            </Text>
            <Text style={contactText}>
              <strong>Telefone:</strong>{" "}
              <Link href="tel:+351963943338" style={link}>
                +351 963 943 338
              </Link>
            </Text>
            <Text style={contactText}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:moto.gardunha@gpepe.pt" style={link}>
                moto.gardunha@gpepe.pt
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Com os melhores cumprimentos,
            <br />
            Equipa Motogardunha
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
  color: "#16A34A",
};

const section = {
  padding: "0 48px",
};

const greeting = {
  fontSize: "16px",
  color: "#333",
  marginBottom: "16px",
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
  marginTop: "16px",
};

const contactText = {
  fontSize: "14px",
  color: "#555",
  margin: "4px 0",
};

const link = {
  color: "#DC2626",
  textDecoration: "none",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  fontSize: "14px",
  color: "#333",
  textAlign: "center" as const,
  padding: "0 48px",
  lineHeight: "24px",
};
