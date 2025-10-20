import requests
from bs4 import BeautifulSoup
import re # Biblioteca para 'Regular Expressions' (para limpar o texto)


# A URL do produto que queremos monitorar
# Exemplo: Kindle 11Âª GeraÃ§Ã£o na Amazon.com.br
URL = 'https://www.amazon.com.br/Echo-Dot-5%C2%AA-gera%C3%A7%C3%A3o-Cor-Preta/dp/B09B8VGCR8/'

# O PREÃ‡O-ALVO que estamos dispostos a pagar
PRECO_ALVO = 400.00

# IMPORTANTE: Sites como a Amazon bloqueiam scripts.
# Precisamos fingir que somos um navegador real.
# VÃ¡ no Google e pesquise "my user agent" e cole o resultado aqui.
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
}


def limpar_preco(preco_texto):
    """
    Recebe um texto (ex: "R$ 476,10") e o transforma em um nÃºmero (ex: 476.10).
    """
    try:
        preco_limpo = preco_texto.replace("R$", "").strip()
        
        preco_limpo = preco_limpo.replace(".", "")
        
        preco_limpo = preco_limpo.replace(",", ".")
        
        return float(preco_limpo)
    except (ValueError, TypeError):
        print(f"Erro ao tentar converter o preÃ§o: {preco_texto}")
        return None


def verificar_preco():
    """
    FunÃ§Ã£o principal que baixa a pÃ¡gina, encontra o preÃ§o e o compara.
    """
    try:
        print(f"Iniciando verificaÃ§Ã£o de preÃ§o para: {URL}")
        pagina = requests.get(URL, headers=HEADERS)
        pagina.raise_for_status() # LanÃ§a um erro se a requisiÃ§Ã£o falhar (ex: 404)
        
        # 'html.parser' Ã© o motor de anÃ¡lise padrÃ£o do Python
        soup = BeautifulSoup(pagina.content, 'html.parser')
        
        # (Como encontrar isso? VÃ¡ na pÃ¡gina, clique com o botÃ£o direito no tÃ­tulo > Inspecionar)
        # O ID do tÃ­tulo na Amazon Ã© 'productTitle'
        titulo = soup.find(id="productTitle")
        if titulo:
            print(f"Produto: {titulo.get_text(strip=True)}")
        
        # (Inspecionar o preÃ§o. Na Amazon, ele estÃ¡ dentro de um <span class="a-offscreen">)
        # Esta classe Ã© usada para leitores de tela, mas contÃ©m o preÃ§o limpo.
        preco_span = soup.find('span', {'class': 'a-offscreen'})
        
        if not preco_span:
            print("NÃ£o foi possÃ­vel encontrar o elemento do preÃ§o. A estrutura do site pode ter mudado.")
            return

        preco_texto_atual = preco_span.get_text(strip=True)
        
        preco_atual = limpar_preco(preco_texto_atual)
        
        if preco_atual is None:
            return

        print(f"PreÃ§o Atual: R$ {preco_atual:,.2f}") # Formata para 2 casas decimais
        print(f"PreÃ§o-Alvo: R$ {PRECO_ALVO:,.2f}")
        
        if preco_atual <= PRECO_ALVO:
            print("\n--- SUCESSO! ---")
            print("O PREÃ‡O BAIXOU! Ã‰ hora de comprar!")
            # (ExtensÃ£o futura: Ã© aqui que vocÃª enviaria um e-mail)
        else:
            print("\n--- AINDA NÃƒO ---")
            print("O preÃ§o ainda estÃ¡ acima do seu alvo.")

    except requests.exceptions.RequestException as e:
        print(f"Erro ao tentar acessar a URL: {e}")
    except Exception as e:
        print(f"Ocorreu um erro inesperado: {e}")

if __name__ == "__main__":
    verificar_preco()
