import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Cookies - Motogardunha",
  description:
    "Política de Cookies da Motogardunha. Saiba como utilizamos cookies no nosso website.",
};

export default function CookiePolicyPage() {
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
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Política de Cookies
            </h1>
            <p className="text-sm text-gray-500">
              Última atualização: {new Date().toLocaleDateString("pt-PT")}
            </p>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              1. O que são Cookies?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Cookies são pequenos ficheiros de texto que são armazenados no seu
              dispositivo (computador, tablet ou telemóvel) quando visita um
              website. Os cookies permitem que o website reconheça o seu
              dispositivo e guarde algumas informações sobre as suas preferências
              ou ações anteriores.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Esta política de cookies é elaborada em conformidade com o
              Regulamento (UE) 2016/679 (RGPD), a Diretiva 2002/58/CE (Diretiva
              ePrivacy), e a Lei n.º 41/2004, de 18 de agosto (Lei das
              Comunicações Eletrónicas).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              2. Base Legal e Consentimento
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              De acordo com a legislação aplicável, a utilização de cookies que
              não sejam estritamente necessários para o funcionamento do website
              requer o seu consentimento prévio, livre, específico, informado e
              inequívoco.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ao visitar o nosso website pela primeira vez, apresentamos um
              banner de consentimento onde pode aceitar ou rejeitar a utilização
              de cookies não essenciais. Pode alterar as suas preferências a
              qualquer momento através das definições do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              3. Como Utilizamos Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos cookies para melhorar a sua experiência no nosso
              website, personalizar conteúdo, analisar o tráfego e compreender
              como os visitantes interagem com o site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              4. Tipos de Cookies que Utilizamos
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4.1 Cookies Estritamente Necessários (Isentos de Consentimento)
                </h3>
                <p className="text-gray-600 leading-relaxed mb-2">
                  Estes cookies são essenciais para o funcionamento do website e
                  estão isentos de consentimento nos termos do artigo 5.º, n.º 3
                  da Diretiva ePrivacy. Permitem funcionalidades básicas como
                  navegação segura e acesso a áreas protegidas.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-gray-700">Nome</th>
                        <th className="text-left py-2 text-gray-700">Finalidade</th>
                        <th className="text-left py-2 text-gray-700">Duração</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b border-gray-100">
                        <td className="py-2">admin_session</td>
                        <td className="py-2">Autenticação de administrador</td>
                        <td className="py-2">7 dias</td>
                      </tr>
                      <tr>
                        <td className="py-2">cookie_consent</td>
                        <td className="py-2">Armazenar preferências de cookies</td>
                        <td className="py-2">12 meses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4.2 Cookies de Desempenho e Análise (Requerem Consentimento)
                </h3>
                <p className="text-gray-600 leading-relaxed mb-2">
                  Estes cookies recolhem informações sobre como os visitantes
                  utilizam o website, como páginas mais visitadas e mensagens de
                  erro. Ajudam-nos a melhorar o funcionamento do website.
                </p>
                <p className="text-xs text-gray-500 italic mt-2">
                  <strong>Nota:</strong> Estes cookies apenas são instalados após
                  o seu consentimento explícito.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-3">
                  <p className="text-sm text-gray-600">
                    <strong>Exemplo:</strong> Google Analytics (se implementado)
                    <br />
                    <strong>Finalidade:</strong> Análise de tráfego e comportamento
                    de utilizadores
                    <br />
                    <strong>Duração:</strong> Até 24 meses
                    <br />
                    <strong>Fornecedor:</strong> Google LLC
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4.3 Cookies de Funcionalidade (Requerem Consentimento)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Estes cookies permitem que o website se lembre das suas
                  escolhas (como idioma ou região) e forneça funcionalidades
                  melhoradas e mais personalizadas.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2">
                  <li>Preferências de visualização</li>
                  <li>Filtros de pesquisa guardados</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  4.4 Cookies de Marketing e Publicidade (Requerem Consentimento)
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Estes cookies são utilizados para apresentar anúncios
                  relevantes para si e os seus interesses. Também são utilizados
                  para limitar o número de vezes que vê um anúncio e para medir a
                  eficácia de campanhas publicitárias.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2">
                  <li>Facebook Pixel (se implementado)</li>
                  <li>Google Ads (se implementado)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              5. Cookies de Terceiros
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Alguns cookies são colocados por serviços de terceiros que aparecem
              nas nossas páginas. Não temos controlo sobre estes cookies. Estes
              terceiros têm as suas próprias políticas de privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              6. Duração dos Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              <strong>Cookies de Sessão:</strong> São temporários e são apagados
              quando fecha o navegador. Não armazenam informações pessoais.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong>Cookies Persistentes:</strong> Permanecem no seu
              dispositivo por um período definido ou até que os elimine
              manualmente. De acordo com as orientações do Grupo de Trabalho do
              Artigo 29.º, os cookies de análise não devem ter uma duração
              superior a 13 meses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              7. Como Gerir e Retirar o Consentimento
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Pode controlar e gerir cookies de várias formas:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  7.1 Banner de Consentimento
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Quando visita o nosso website pela primeira vez, apresentamos
                  um banner de consentimento onde pode aceitar ou rejeitar
                  cookies não essenciais. O consentimento é válido por 12 meses,
                  após o qual será solicitado novamente.
                </p>
                <p className="text-gray-600 leading-relaxed mt-2">
                  <strong>Retirar o Consentimento:</strong> Pode retirar o seu
                  consentimento a qualquer momento eliminando os cookies através
                  das definições do navegador. A retirada do consentimento não
                  compromete a licitude do tratamento efetuado com base no
                  consentimento previamente dado.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  7.2 Definições do Navegador
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  A maioria dos navegadores permite controlar cookies através das
                  definições. Pode configurar o navegador para:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2">
                  <li>Bloquear todos os cookies</li>
                  <li>Aceitar apenas cookies de primeira parte</li>
                  <li>Eliminar cookies ao fechar o navegador</li>
                  <li>Receber notificações antes de aceitar cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  7.3 Links para Gestão de Cookies nos Navegadores
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/pt-PT/kb/cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/pt-pt/microsoft-edge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              8. Impacto de Desativar Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Se desativar ou recusar cookies, algumas funcionalidades do website
              podem não funcionar corretamente. Por exemplo, pode não conseguir
              guardar preferências ou aceder a determinadas áreas do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              9. Transferências Internacionais
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Alguns cookies de terceiros (como Google Analytics, se
              implementado) podem transferir dados para fora do Espaço Económico
              Europeu. Estes fornecedores comprometem-se a garantir um nível
              adequado de proteção de dados através de cláusulas contratuais-tipo
              aprovadas pela Comissão Europeia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              10. Alterações a Esta Política
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Podemos atualizar esta Política de Cookies periodicamente para
              refletir alterações nas nossas práticas ou por outros motivos
              operacionais, legais ou regulamentares. Recomendamos que reveja
              esta página regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              11. Mais Informações
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Para mais informações sobre como tratamos os seus dados pessoais,
              consulte a nossa{" "}
              <Link
                href="/politica-privacidade"
                className="text-primary hover:underline"
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">
              12. Contacto e Direitos
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Para exercer os seus direitos relativos aos dados recolhidos
              através de cookies (acesso, retificação, eliminação, oposição) ou
              para esclarecer dúvidas sobre esta política, contacte-nos:
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Se tiver questões sobre a nossa utilização de cookies, contacte-nos:
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
