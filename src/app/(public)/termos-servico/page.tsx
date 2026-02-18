import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termos de Serviço - Motogardunha",
  description:
    "Termos e Condições de Utilização do website e serviços da Motogardunha.",
};

export default function TermsOfServicePage() {
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
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Termos de Serviço
            </h1>
            <p className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString("pt-PT")}
            </p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              1. Aceitação dos Termos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao aceder e utilizar o website da Motogardunha, você concorda em
              cumprir e estar vinculado a estes Termos de Serviço. Se não
              concordar com qualquer parte destes termos, não deverá utilizar o
              nosso website ou serviços.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Estes termos regem-se pela legislação portuguesa, nomeadamente pelo
              Decreto-Lei n.º 24/2014, de 14 de fevereiro (Lei do Comércio
              Eletrónico), pela Lei n.º 24/96, de 31 de julho (Lei de Defesa do
              Consumidor), e pelo Código Civil Português.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              2. Identificação da Entidade
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-2">
              <p className="text-gray-700">
                <strong>Denominação Social:</strong> Motogardunha
              </p>
              <p className="text-gray-700">
                <strong>Sede:</strong> {CONTACT.address}
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
              <p className="text-gray-700">
                <strong>Horário de Atendimento:</strong> {CONTACT.hours.weekdays}
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              3. Descrição dos Serviços
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A Motogardunha oferece os seguintes serviços através do website:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li>Venda de motociclos novos e usados</li>
              <li>Venda de equipamento e acessórios para motociclistas</li>
              <li>Serviços de manutenção e reparação</li>

              <li>Agendamento de test-drives</li>
              <li>Assistência e suporte ao cliente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              4. Utilização do Website
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Ao utilizar o nosso website, compromete-se a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Fornecer informações verdadeiras e precisas</li>
              <li>Não utilizar o website para fins ilegais ou não autorizados</li>
              <li>Não tentar aceder a áreas restritas do website</li>
              <li>Não transmitir vírus ou código malicioso</li>
              <li>Respeitar os direitos de propriedade intelectual</li>
              <li>Não fazer uso abusivo dos formulários de contacto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              5. Encomendas e Pagamentos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>5.1 Processo de Encomenda:</strong> Todas as encomendas
              estão sujeitas a disponibilidade e confirmação. Reservamo-nos o
              direito de recusar qualquer encomenda por motivos justificados.
              Após a confirmação da encomenda, receberá um email de confirmação
              com os detalhes da compra.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>5.2 Preços:</strong> Os preços apresentados no website
              incluem IVA à taxa legal em vigor (23% ou taxa reduzida conforme
              aplicável). Os preços podem ser alterados sem aviso prévio, mas o
              preço aplicável será sempre o vigente no momento da encomenda.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>5.3 Pagamento:</strong> Aceitamos diversas formas de
              pagamento incluindo transferência bancária, multibanco, MB WAY e
              cartão de crédito/débito. O pagamento deve ser efetuado conforme
              acordado no momento da encomenda.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>5.4 Fatura:</strong> Será emitida fatura com NIF para todas
              as transações, em cumprimento da legislação fiscal portuguesa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              6. Entregas e Devoluções (Decreto-Lei n.º 24/2014)
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>6.1 Entregas:</strong> Os prazos de entrega indicados são
              estimados e podem variar consoante a disponibilidade e localização.
              Faremos todos os esforços para cumprir os prazos indicados. Em caso
              de atraso superior a 30 dias, o consumidor pode resolver o contrato.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>6.2 Direito de Livre Resolução (Artigo 10.º):</strong> De
              acordo com o Decreto-Lei n.º 24/2014, tem direito a resolver o
              contrato, sem necessidade de indicar o motivo, no prazo de 14 dias
              a contar da receção dos bens. Este direito não se aplica a:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2 ml-4">
              <li>Bens personalizados ou feitos sob medida</li>
              <li>Bens que se deterioram ou expiram rapidamente</li>
              <li>Bens selados que foram abertos (por razões de higiene)</li>
              <li>Motociclos usados (bens em segunda mão)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>6.3 Exercício do Direito de Livre Resolução:</strong> Para
              exercer este direito, deve notificar-nos de forma inequívoca
              (email, carta) da sua decisão. Disponibilizamos um{" "}
              <a
                href="/modelo-resolucao.pdf"
                className="text-primary hover:underline"
                target="_blank"
              >
                modelo de formulário de resolução
              </a>
              , mas a sua utilização é facultativa.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>6.4 Reembolso:</strong> Procederemos ao reembolso de todos
              os pagamentos recebidos, incluindo despesas de entrega (exceto
              custos suplementares de opção de entrega diferente da standard), no
              prazo de 14 dias após receção da comunicação de resolução.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              7. Garantias e Conformidade (Decreto-Lei n.º 67/2003)
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>7.1 Garantia Legal:</strong> Todos os produtos vendidos
              incluem a garantia legal de conformidade de 2 anos, conforme o
              Decreto-Lei n.º 67/2003, de 8 de abril. Esta garantia cobre
              defeitos de conformidade que existam no momento da entrega.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>7.2 Prazo para Denúncia:</strong> O consumidor deve
              denunciar a falta de conformidade no prazo de 2 meses a contar da
              data em que a tenha detetado.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>7.3 Garantia Comercial:</strong> Motociclos novos podem
              incluir garantia comercial adicional do fabricante, cujos termos
              serão fornecidos no momento da compra. Esta garantia é adicional e
              não substitui a garantia legal.
            </p>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>7.4 Bens Usados:</strong> Para motociclos usados, as partes
              podem acordar um período de garantia inferior, mas nunca inferior a
              1 ano, conforme previsto na lei.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              8. Propriedade Intelectual
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Todo o conteúdo do website, incluindo textos, imagens, logótipos,
              gráficos e código, é propriedade da Motogardunha ou dos seus
              licenciadores e está protegido por leis de direitos de autor. Não
              pode reproduzir, distribuir ou utilizar qualquer conteúdo sem
              autorização prévia por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              9. Limitação de Responsabilidade
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A Motogardunha não se responsabiliza por:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mt-3">
              <li>Danos indiretos ou consequenciais resultantes da utilização do website</li>
              <li>Interrupções ou erros no funcionamento do website</li>
              <li>Informações fornecidas por terceiros</li>
              <li>Links para websites externos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              10. Proteção de Dados
            </h2>
            <p className="text-gray-600 leading-relaxed">
              O tratamento dos seus dados pessoais está sujeito à nossa{" "}
              <Link
                href="/politica-privacidade"
                className="text-primary hover:underline"
              >
                Política de Privacidade
              </Link>
              . Ao utilizar o website, consente o tratamento dos seus dados
              conforme descrito na política.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              11. Resolução de Litígios
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>11.1 Resolução Alternativa de Litígios:</strong> Em caso de
              litígio, o consumidor pode recorrer a uma Entidade de Resolução
              Alternativa de Litígios de consumo:
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Centro de Arbitragem de Conflitos de Consumo</strong>
              </p>
              <p className="text-sm text-gray-600">
                Website:{" "}
                <a
                  href="https://www.centroarbitragemlisboa.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.centroarbitragemlisboa.pt
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Plataforma Europeia de Resolução de Litígios Online:</strong>
                <br />
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>
            <p className="text-gray-600 leading-relaxed mt-3">
              <strong>11.2 Livro de Reclamações:</strong> Disponibilizamos Livro
              de Reclamações eletrónico, conforme previsto na legislação
              portuguesa. Pode aceder através do link no rodapé do website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              12. Alterações aos Termos
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Reservamo-nos o direito de modificar estes Termos de Serviço a
              qualquer momento. As alterações entram em vigor imediatamente após
              a publicação no website. É sua responsabilidade rever
              periodicamente estes termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              13. Lei Aplicável e Jurisdição
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Estes Termos de Serviço são regidos pela lei portuguesa,
              nomeadamente pelo Código Civil, Código do Consumidor, e legislação
              aplicável ao comércio eletrónico. Qualquer litígio será da
              competência dos tribunais portugueses, sem prejuízo do direito do
              consumidor de recorrer aos tribunais da sua área de residência.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              14. Contacto
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para questões sobre estes Termos de Serviço, contacte-nos:
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
