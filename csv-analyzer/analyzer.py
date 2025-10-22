# --- Nossos Artistas e Engenheiros ---
# Pandas é o nosso mestre em manipulação de dados, como uma planilha inteligente.
import pandas as pd
# Matplotlib e Seaborn são nossos artistas, responsáveis por desenhar os gráficos.
import matplotlib.pyplot as plt
import seaborn as sns
# OS nos ajuda a interagir com o sistema, como pegar o nome de um arquivo.
import os

class CSVAnalyzer:
    """
    Essa é a nossa "caixa de ferramentas" principal.
    Ela guarda os dados do CSV e tem todas as funções para analisá-los.
    """
    def __init__(self, filepath):
        """
        Tudo começa aqui. Quando criamos um Analisador, ele imediatamente
        tenta carregar o arquivo CSV que nos foi dado.
        
        Usamos um bloco 'try...except' como uma rede de segurança. É como tentar
        abrir uma porta: se o arquivo não existir (FileNotFoundError) ou se algo
        der errado na leitura, nós avisamos o erro de forma amigável em vez de
        quebrar o programa.
        """
        try:
            # Às vezes, ao arrastar um arquivo para o terminal, ele vem com aspas
            # ou espaços indesejados. Essa linha limpa essa "sujeira".
            clean_path = filepath.strip().strip("'\"")
            
            self.df = pd.read_csv(clean_path)
            self.filename = os.path.basename(clean_path)
            print(f"\nArquivo '{self.filename}' carregado com sucesso!")

            # --- MELHORIA: Tenta converter colunas de data ---
            # Verificamos se uma coluna chamada 'DataVenda' existe para ser convertida.
            if 'DataVenda' in self.df.columns:
                try:
                    self.df['DataVenda'] = pd.to_datetime(self.df['DataVenda'])
                    print("Coluna 'DataVenda' convertida para o formato de data.")
                except Exception:
                    print("Aviso: Não foi possível converter a coluna 'DataVenda' para o formato de data.")
            
            print("-" * 30)
        except FileNotFoundError:
            print(f"\nOps! Não consegui encontrar o arquivo em '{filepath}'. Verifique o caminho e tente de novo.")
            self.df = None
        except Exception as e:
            print(f"\nTive um problema ao tentar ler o arquivo: {e}")
            self.df = None

    def display_summary(self):
        """
        Esta função é como o "raio-X" dos nossos dados.
        Ela nos dá uma visão geral rápida e essencial.
        """
        if self.df is None:
            return
        
        print("\n--- Um Raio-X dos Seus Dados ---")
        print(f"Dimensões: {self.df.shape[0]} linhas e {self.df.shape[1]} colunas.")
        
        print("\nColunas e Tipos de Dados:")
        self.df.info()
        
        missing_values = self.df.isnull().sum()
        if missing_values.sum() > 0:
            print("\nEncontrei alguns campos vazios (valores faltantes):")
            print(missing_values[missing_values > 0])
        else:
            print("\nÓtima notícia: não há nenhum valor faltante nos seus dados!")
        print("-" * 30)

    def display_descriptive_stats(self):
        """
        Agora, vamos para a matemática! Esta função calcula as estatísticas
        mais importantes (média, mediana, desvio padrão, etc.) para todas as
        colunas que contêm números.
        """
        if self.df is None:
            return
        
        print("\n--- Análise Estatística (para colunas numéricas) ---")
        print(self.df.describe(include='number'))
        print("-" * 50)

    def plot_histogram(self, column):
        """
        Um histograma nos ajuda a ver a "personalidade" de uma coluna numérica,
        mostrando onde os valores se concentram mais.
        
        Args:
            column (str): O nome da coluna que queremos investigar.
        """
        if self.df is None or column not in self.df.columns:
            print(f"Hmm, não encontrei uma coluna chamada '{column}'.")
            return
        
        if not pd.api.types.is_numeric_dtype(self.df[column]):
            print(f"A coluna '{column}' não parece ser numérica. Tente um gráfico de barras para ela.")
            return

        plt.figure(figsize=(10, 6))
        sns.histplot(self.df[column], kde=True, bins=30)
        plt.title(f'Como os valores de "{column}" estão distribuídos', fontsize=16)
        plt.xlabel(column, fontsize=12)
        plt.ylabel('Frequência (Quantas vezes aparece)', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.6)
        plt.show()
        
    def plot_barchart(self, column):
        """
        Gráficos de barra são perfeitos para contar coisas. Esta função conta
        quantas vezes cada valor aparece em uma coluna.
        
        Args:
            column (str): A coluna cujos valores queremos contar.
        """
        if self.df is None or column not in self.df.columns:
            print(f"Hmm, não encontrei uma coluna chamada '{column}'.")
            return
        
        if pd.api.types.is_numeric_dtype(self.df[column]) and self.df[column].nunique() > 15:
            print(f"Aviso: '{column}' tem muitos números diferentes. O gráfico pode ficar um pouco poluído.")

        plt.figure(figsize=(12, 7))
        top_values = self.df[column].value_counts().nlargest(15)
        
        sns.barplot(x=top_values.index, y=top_values.values, palette='viridis')
        plt.title(f'Os 15 valores mais comuns em "{column}"', fontsize=16)
        plt.xlabel(column, fontsize=12)
        plt.ylabel('Contagem', fontsize=12)
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.grid(True, linestyle='--', alpha=0.6, axis='y')
        plt.show()

def main_menu(analyzer):
    """
    Este é o coração interativo do programa, nosso painel de controle.
    Ele fica em um loop, mostrando as opções e esperando a decisão do usuário.
    """
    while True:
        print("\nO que você gostaria de fazer com esses dados?")
        print("1. Ter uma visão geral (raio-X)")
        print("2. Ver a análise estatística")
        print("3. Contar valores com um Gráfico de Barras")
        print("4. Ver a distribuição com um Histograma")
        print("0. Sair do programa")

        choice = input("Digite o número da sua escolha: ")

        if choice == '1':
            analyzer.display_summary()
        elif choice == '2':
            analyzer.display_descriptive_stats()
        elif choice == '3':
            print("\nColunas disponíveis:", list(analyzer.df.columns))
            column = input("Qual coluna você quer usar para o gráfico de barras? ")
            analyzer.plot_barchart(column)
        elif choice == '4':
            numeric_cols = analyzer.df.select_dtypes(include='number').columns.tolist()
            print("\nColunas numéricas disponíveis:", numeric_cols)
            column = input("Qual coluna numérica você quer usar para o histograma? ")
            analyzer.plot_histogram(column)
        elif choice == '0':
            print("\nAnálise encerrada. Até a próxima!")
            break
        else:
            print("\nOpção inválida. Por favor, escolha um dos números do menu.")

if __name__ == "__main__":
    sns.set_theme(style="whitegrid")

    print("--- Bem-vindo ao Analisador de CSV! ---")
    filepath = input("Por favor, arraste o arquivo CSV para cá ou digite o caminho completo e pressione Enter: ")
    
    analyzer = CSVAnalyzer(filepath)

    if analyzer.df is not None:
        main_menu(analyzer)