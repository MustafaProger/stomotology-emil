export default function cardFlip() {
    document.querySelectorAll('.flip-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.service-card-inner').classList.add('flipped');
        });
    });

    document.querySelectorAll('.flip-back-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.service-card-inner').classList.remove('flipped');
        });
    });
}