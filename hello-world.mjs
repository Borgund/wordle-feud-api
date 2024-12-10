export default function HelloWorld({ html, state }) {
  const { attrs } = state;
  const { greeting = "Hello World", test } = attrs;
  return html`
    <style scope="global">
      h1 {
        color: red;
      }
    </style>

    <h1>${greeting}</h1>
    <span>${test}</span>
  `;
}
