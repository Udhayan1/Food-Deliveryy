  document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // Optionally reset the form fields
        this.reset();

        // Handle the redirect if necessary
        window.location.href = 'https://your-redirect-url.com'; // Replace with your redirect URL
      } else {
        alert('There was an issue with the form submission.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error submitting the form.');
    });
  });
