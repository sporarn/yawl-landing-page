const scriptURL = 'https://script.google.com/macros/s/AKfycbyj0yFo24ATiuHOGpniSFIiV0rcBZeUL2M2sfZHxhrnu43vRhjKoXHo7yNvwSG3NIeRmQ/exec';
  const SECRET_KEY = "K-hYzBKGq1kDQKkjVYuoVXXalwU"; // must match your Apps Script

  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      honeypot: form.website.value.trim(),
      key: SECRET_KEY
    };

    // Client-side honeypot check
    if (formData.honeypot !== "") {
      console.warn("Bot detected — submission blocked.");
      return;
    }

    fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(response => {
      if (response.result === "success") {
        alert('Tack! Ditt meddelande har skickats');
        form.reset();
      } else {
        alert('Obehörig begäran eller misstänkt bot-aktivitet.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('Något gick fel – försök igen senare.');
    });
  });
