import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade - Motogardunha",
  description:
    "Política de Privacidade da Motogardunha. Saiba como protegemos e tratamos os seus dados pessoais.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Política de Privacidade
            </h1>
            <p className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString("pt-PT")}
            </p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              1. Introdução
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              A Motogardunha, enquanto responsável pelo tratamento de dados
              pessoais, respeita a sua privacidade e está comprometida em
              proteger os seus dados pessoais em conformidade com o Regulamento
              Geral sobre a Proteção de Dados (RGPD - Regulamento UE 2016/679) e
              a Lei n.º 58/2019, de 8 de agosto.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Esta política de privacidade explica como recolhemos, usamos,
              armazenamos e protegemos as suas informações pessoais quando
              utiliza o nosso website e serviços, bem como os seus direitos
              enquanto titular dos dados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              2. Identificação do Responsável pelo Tratamento
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-2">
              <p className="text-gray-700">
                <strong>Entidade:</strong> Motogardunha
              </p>
              <p className="text-gray-700">
                <strong>Morada:</strong> {CONTACT.address}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Telefone:</strong>{" "}
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              3. Dados que Recolhemos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Recolhemos os seguintes tipos de dados pessoais:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong>Dados de Identificação:</strong> Nome, apelido, email,
                número de telefone
              </li>
              <li>
                <strong>Dados de Navegação:</strong> Endereço IP, tipo de
                navegador, páginas visitadas
              </li>
              <li>
                <strong>Dados de Comunicação:</strong> Mensagens enviadas
                através dos formulários de contacto
              </li>
              <li>
                <strong>Dados de Interesse:</strong> Modelos de motos ou
                produtos pelos quais demonstrou interesse
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              4. Como Utilizamos os Seus Dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Utilizamos os seus dados pessoais para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Responder às suas solicitações e pedidos de informação</li>
              <li>Processar e gerir encomendas e reservas</li>
              <li>Enviar comunicações sobre produtos e serviços (com o seu consentimento)</li>
              <li>Melhorar a experiência do utilizador no nosso website</li>
              <li>Cumprir obrigações legais e regulamentares</li>
              <li>Prevenir fraudes e garantir a segurança do website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              5. Base Legal para o Tratamento
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Tratamos os seus dados pessoais com base em:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li>
                <strong>Consentimento:</strong> Quando nos dá permissão explícita
                para processar os seus dados
              </li>
              <li>
                <strong>Execução de Contrato:</strong> Para processar encomendas
                e prestar serviços solicitados
              </li>
              <li>
                <strong>Interesses Legítimos:</strong> Para melhorar os nossos
                serviços e prevenir fraudes
              </li>
              <li>
                <strong>Obrigações Legais:</strong> Para cumprir requisitos
                legais e fiscais
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              6. Partilha de Dados
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Não vendemos os seus dados pessoais a terceiros. Podemos partilhar
              os seus dados com:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li>Fornecedores de serviços que nos ajudam a operar o website</li>
              <li>Parceiros de pagamento para processar transações</li>
              <li>Autoridades legais quando exigido por lei</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              7. Segurança dos Dados
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Implementamos medidas técnicas e organizacionais adequadas para
              proteger os seus dados pessoais contra acesso não autorizado,
              alteração, divulgação ou destruição. Utilizamos encriptação SSL,
              armazenamento seguro e controlos de acesso rigorosos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              8. Os Seus Direitos (Artigos 15.º a 22.º do RGPD)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              De acordo com o RGPD, tem os seguintes direitos que pode exercer a
              qualquer momento:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-600">
              <li>
                <strong>Direito de Acesso (Art. 15.º):</strong> Solicitar
                confirmação sobre se os seus dados pessoais são tratados e, em
                caso afirmativo, aceder aos mesmos e obter uma cópia.
              </li>
              <li>
                <strong>Direito de Retificação (Art. 16.º):</strong> Solicitar a
                correção de dados pessoais inexatos ou incompletos.
              </li>
              <li>
                <strong>Direito ao Apagamento/"Direito a Ser Esquecido" (Art.
                17.º):</strong> Solicitar a eliminação dos seus dados pessoais,
                nas condições previstas na lei.
              </li>
              <li>
                <strong>Direito à Limitação do Tratamento (Art. 18.º):</strong>
                Solicitar a limitação do tratamento dos seus dados pessoais em
                determinadas circunstâncias.
              </li>
              <li>
                <strong>Direito à Portabilidade dos Dados (Art. 20.º):</strong>
                Receber os dados pessoais que lhe digam respeito num formato
                estruturado, de uso corrente e de leitura automática, e
                transmiti-los a outro responsável pelo tratamento.
              </li>
              <li>
                <strong>Direito de Oposição (Art. 21.º):</strong> Opor-se, a
                qualquer momento, ao tratamento dos seus dados pessoais.
              </li>
              <li>
                <strong>Direito de Não Ficar Sujeito a Decisões Automatizadas
                (Art. 22.º):</strong> Não ficar sujeito a nenhuma decisão
                exclusivamente baseada no tratamento automatizado que produza
                efeitos na sua esfera jurídica.
              </li>
              <li>
                <strong>Direito de Retirar o Consentimento:</strong> Retirar o
                consentimento a qualquer momento, sem comprometer a licitude do
                tratamento efetuado com base no consentimento previamente dado.
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              <strong>Como exercer os seus direitos:</strong> Para exercer
              qualquer um destes direitos, contacte-nos através dos meios
              indicados na secção "Contacto". Responderemos ao seu pedido no
              prazo de um mês, podendo este prazo ser prorrogado por mais dois
              meses em casos de particular complexidade.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>Direito de Reclamação:</strong> Tem o direito de apresentar
              reclamação à Comissão Nacional de Proteção de Dados (CNPD) se
              considerar que o tratamento dos seus dados pessoais viola o RGPD:
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
              <p className="text-sm text-gray-700">
                <strong>CNPD - Comissão Nacional de Proteção de Dados</strong>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Av. D. Carlos I, 134, 1.º<br />
                1200-651 Lisboa<br />
                Tel: (+351) 213 928 400<br />
                Email: geral@cnpd.pt<br />
                Website:{" "}
                <a
                  href="https://www.cnpd.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.cnpd.pt
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              9. Retenção de Dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Mantemos os seus dados pessoais apenas pelo tempo necessário para
              cumprir os fins para os quais foram recolhidos, de acordo com os
              seguintes critérios:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                <strong>Dados de Contacto (Leads):</strong> Conservados durante 3
                anos após o último contacto, salvo consentimento para período
                superior ou obrigação legal de conservação.
              </li>
              <li>
                <strong>Dados de Clientes:</strong> Conservados durante o período
                de vigência do contrato e até 10 anos após a sua cessação, para
                cumprimento de obrigações fiscais e contabilísticas.
              </li>
              <li>
                <strong>Dados de Garantia:</strong> Conservados durante o período
                de garantia legal (2 anos) e até 5 anos para efeitos de prova.
              </li>
              <li>
                <strong>Dados de Navegação (Cookies):</strong> Conservados pelo
                período indicado na Política de Cookies (máximo 13 meses).
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              Após estes períodos, os dados serão eliminados de forma segura ou
              anonimizados para fins estatísticos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              10. Cookies e Tecnologias Semelhantes
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos cookies para melhorar a sua experiência no nosso
              website. Para mais informações, consulte a nossa{" "}
              <Link
                href="/politica-cookies"
                className="text-primary hover:underline"
              >
                Política de Cookies
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              11. Transferências Internacionais de Dados
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Os seus dados pessoais são armazenados em servidores localizados na
              União Europeia. Caso seja necessário transferir dados para fora do
              Espaço Económico Europeu (EEE), garantiremos que existem garantias
              adequadas, tais como cláusulas contratuais-tipo aprovadas pela
              Comissão Europeia ou certificação Privacy Shield, conforme aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              12. Menores de Idade
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Os nossos serviços não se destinam a menores de 16 anos. Não
              recolhemos intencionalmente dados pessoais de menores. Se tiver
              conhecimento de que um menor nos forneceu dados pessoais, contacte-nos
              para que possamos eliminá-los.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              13. Alterações a Esta Política
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos atualizar esta política de privacidade periodicamente.
              Notificaremos sobre alterações significativas através do website ou
              por email. A data da última atualização está indicada no topo desta
              página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              14. Contacto e Encarregado de Proteção de Dados
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para exercer os seus direitos ou esclarecer dúvidas sobre esta
              política, contacte-nos:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 space-y-2">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT.email}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Telefone:</strong>{" "}
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="text-primary hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Morada:</strong> {CONTACT.address}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
