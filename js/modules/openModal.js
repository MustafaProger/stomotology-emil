export default function openModal() {
    const modalButtons = document.querySelectorAll('.btn_for_modal');
    const modals = document.querySelectorAll('.modal');

    function openModal(modal) {
        modal.style.display = 'flex';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetModalId = button.getAttribute('data-target');
            const targetModal = document.getElementById(targetModalId);
            openModal(targetModal);
        });
    });

    modals.forEach(modal => {
        const closeButton = modal.querySelector('.modal__close');
        closeButton.addEventListener('click', () => closeModal(modal));
    });

    window.addEventListener('click', function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
}