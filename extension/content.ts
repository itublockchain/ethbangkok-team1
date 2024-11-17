import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
};

// Uygulamanızda sakladığınız kullanıcı adı ve şifreler
const localPasswords = {
  "https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F": { username: "dinc22", password: "Nimety6465" },
  "another-site.com": { username: "admin@site.com", password: "securepassword" },
};

window.addEventListener("load", () => {
  const passwordFields = document.querySelectorAll("input[type='password']");

  passwordFields.forEach((passwordField) => {
    const inputPassword = passwordField as HTMLInputElement;


    const parentElement = inputPassword.closest("form") || passwordField.parentElement;
    const usernameField = parentElement?.querySelector("input[type='text'], input[type='email']") as HTMLInputElement;

    if (!usernameField) {
      console.warn("No username");
      return;
    }


    inputPassword.addEventListener("focus", () => {
      if (
        inputPassword.nextSibling &&
        (inputPassword.nextSibling as HTMLElement).className === "fill-password-btn"
      ) {
        return;
      }

      const button = document.createElement("button");
      button.innerText = "Fill!";
      button.className = "fill-password-btn";
      button.style.background = "#27C156"
      button.style.margin = "auto";
      button.style.cursor = "pointer";

      button.addEventListener("click", (event) => {
        event.preventDefault();

        // Mevcut URL'yi al ve eşleştir
        const currentUrl = window.location.hostname;
        inputPassword.value = "mevlana12";
      });


      inputPassword.parentNode?.insertBefore(button, inputPassword.nextSibling);
    });

  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.domain) {
      console.log(`Domain: ${message.domain}`);
    } else {
      console.error("Mesaj içeriği eksik:", message);
    }
  });

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   console.log("Mesage:", message); // Mesajın içeriğini kontrol edin
  //   if (message && message.domain) {
  //       console.log(Domain : ${message.domain});
  //   } else {
  //       console.error("Mesaj içeriği eksik:", message);
  //   }
  // });
});
