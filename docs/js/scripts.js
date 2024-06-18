/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }
    ;

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitSuccessMessage = document.getElementById('submitSuccessMessage');
    const submitErrorMessage = document.getElementById('submitErrorMessage');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Check if the form is valid
        if (!form.checkValidity()) {
            event.stopPropagation(); // Prevent default submission
            form.classList.add('was-validated'); // Add Bootstrap's validation classes
            return;
        }

        // If form is valid, proceed with form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        const data = {
            attachments: [
                {
                    color: "#36a64f",
                    blocks: [
                        {
                            type: "header",
                            text: {
                                type: "plain_text",
                                text: "New query!",
                                emoji: true
                            }
                        },
                        {
                            type: "divider"
                        },
                        {
                            type: "context",
                            elements: [
                                {
                                    type: "mrkdwn",
                                    text: "*Name:* " + name
                                },
                                {
                                    type: "mrkdwn",
                                    text: "*Phone:* " + phone
                                },
                                {
                                    type: "mrkdwn",
                                    text: "*Email:* " + email
                                }
                            ]
                        },
                        {
                            type: "context",
                            elements: [
                                {
                                    type: "mrkdwn",
                                    text: "*Message:* " + message
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        const apiUrl = "https://hooks.slack.com/services/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"
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            mode: "cors",
            method: "POST",
            // headers: myHeaders,
            body: JSON.stringify(data),
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Show success message
                submitSuccessMessage.classList.remove('d-none');
                submitErrorMessage.classList.add('d-none');
                form.reset(); // Reset form fields
                form.classList.remove('was-validated'); // Remove Bootstrap's validation classes
            })
            .catch(error => {
                // Show error message
                submitErrorMessage.classList.remove('d-none');
                submitSuccessMessage.classList.add('d-none');
            });
    });

    // Reset validation on form input change
    const formControls = form.querySelectorAll('.form-control');
    formControls.forEach(input => {
        input.addEventListener('input', function () {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
            } else {
                input.classList.add('is-invalid');
            }
        });
    });
});
