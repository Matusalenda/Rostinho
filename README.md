# Rostinho

<p>
  é um web-app PWA(Progressive Web Application) desenvolvido com a finalidade de gerar etiquetas A4 utilizadas na identificação e armazenagem de pallets.
</p>

## Stack utilizada

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="64" height="64" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="64" height="64" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="64" height="64" />
</p>


## Estrutura do projeto

```text
Rostinho/
|   |-- index.html            Estrutura da interface
|   `-- src/
|       |-- audio/            Sons WAV do app
|       |-- css/
|       |   `-- style.css     Estilos da interface
|       |-- img/              Imagens e logos
|       `-- JS/
|           |-- main.js       Inicialização do app
|           |-- lib/          Bibliotecas locais
|           `-- modules/      Módulos da aplicação
|-- service-worker.js        Cache e suporte offline para a PWA
|-- manifest.json            Metadados do app instalável
|-- README.md
```


### Arquivos principais:

| Arquivo                           | Responsabilidade                                          |
| --------------------------------- | --------------------------------------------------------- |
| `src/JS/main.js`              | Inicialização e eventos principais.                       |
| `src/JS/modules/state.js`     | Variaveis de estado compartilhado do app.                              |
| `src/JS/modules/keyboard.js`  | Atalhos e fluxo pelo teclado/scanner.                     |
| `src/JS/modules/utils.js`     | Foco, troca de telas, limpeza e modo AUTO/MANUAL.         |
| `src/JS/modules/audio.js`     | Carrega e toca os arquivos WAV de erro, scan e sucesso.   |
| `src/JS/modules/printData.js` | Geração da etiqueta, QR Codes e impressão. |




# Desenvolvimento e manutenção


## Service Worker

O app possui um service-worker que no primeiro acesso registra um cache chamado "Rostinho-v1" e armazena os seus arquivos principais. Nos próximos acessos utiliza uma esratégia chamada cache-first, onde busca sempre os arquivos salvos em cache, possibilitando o uso do app offline.

## Manifest.json

O manifest.json do projeto define que o app se chama ROSTINHO, inicia em index.html, ocupa a tela inteira em modo standalone e usa ícones em 192x192 e 512x512. Também define a cor de fundo, a cor temática e a orientação portrait-primary, o que faz com que o app seja exibido como um aplicativo instalado e com identidade visual consistente.


## Onde editar

### Interface do app

Edite a estrutura e o visual das telas em:

```text
index.html
src/css/style.css
```

### Etiqueta A4

Edite a etiqueta gerada em:

```text
./index.html (estrutura da label)
src/css/label.css (layout visual)
src/JS/modules/printData.js (lógica)

### Lógica do app

Os módulos JavaScript ficam em:

```text
src/JS/
src/JS/modules/
```

### Geração de QR Code

O projeto possui uma biblioteca local em `src/JS/lib/qrcode-lib.js` para gerar os QR Codes usados nas etiquetas. Ela recebe uma string, gera o padrão do código em formato matricial e renderiza o resultado em um container HTML, sendo usada pela lógica de impressão em `src/JS/modules/printData.js`.

### Sons do app

Os arquivos de áudio ficam em:

```text
src/audio/error.wav
src/audio/scan.wav
src/audio/success.wav
```

O módulo que carrega e toca esses arquivos fica em:

```text
src/JS/modules/audio.js
```

Nesse arquivo existe um objeto `sounds` com os áudios pré-carregados:

- `error`: usado pelos alertas de erro.
- `scan`: usado quando um part-number é lido corretamente no modo AUTO.
- `successSound`: usado nas ações de sucesso, como troca de tela e PRINT sem erros.

As funções públicas resetam o áudio com `currentTime = 0` antes de tocar, permitindo repetir o mesmo som várias vezes seguidas:

- `playErrorSound()`: toca `sounds.error`.
- `playScanSound()`: toca `sounds.scan`.
- `playSuccessSound()`: toca `sounds.successSound`.

Para mudar algum som, substitua o respectivo arquivo `.wav` em `www/src/audio/` mantendo o mesmo nome, ou atualize o caminho no objeto `sounds`.

## Testar no navegador


Para testar no navegador, após executar as alterações nos arquivos salve o arquivo e rode um servidor local na raíz do projeto.


```bash
python -m http.server 8080
```

```bash
start chrome http://localhost:8080
```

## Limitação de zoom

Em ./index.html na tag `HEAD` no viewport o zoom da página foi bloqueado, com o intuito de manter a interface estável e evitar alterações indesejadas no layout durante o uso em terminal ou em ambientes controlados.

```bash
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover"
    />
```

# Usabilidade

## Fluxo de uso

1. Informe o nome do operador na primeira tela.
2. Na tela seguinte, leia ou digite o part-number.
3. Use o modo AUTO para contar leituras repetidas do mesmo part-number.
4. Use o modo MANUAL para preencher part-number e quantidade manualmente.
5. Pressione PRINT para gerar a etiqueta.
6. Instale ou imprima conforme o fluxo configurado no coletor.

## Modos de operação

| Modo   | Como funciona                                                                       |
| ------ | ----------------------------------------------------------------------------------- |
| AUTO   | A quantidade fica bloqueada e aumenta a cada leitura repetida do mesmo part-number. |
| MANUAL | Part-number e quantidade ficam liberados para preenchimento manual.                 |

O botão **MODE** alterna entre AUTO e MANUAL.

## Atalhos de teclado

| Tecla                  | Ação                                                      |
| ---------------------- | --------------------------------------------------------- |
| `Enter`, `Tab` ou `F4` | Confirma o fluxo atual. No modo AUTO, registra a leitura. |
| `F1`                   | Imprime a etiqueta.                                       |
| `F2`                   | Limpa os campos.                                          |
| `F3`                   | Alterna entre AUTO e MANUAL.                              |
| `F9`                   | Volta para a tela do operador.                            |
| `Seta para cima/baixo` | Alterna entre campos no modo MANUAL.                      |

Algumas teclas do navegador são bloqueadas para evitar saídas acidentais durante o uso em terminal.


## Autor

Marcos Matusalem - 2026
