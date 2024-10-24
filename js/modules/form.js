export default function form() {
    function handleFloatingLabel(labelsForInputSelector, labelsForTextareaSelector, inputSelector, textareaSelector) {
        const labelsForInput = document.querySelectorAll(labelsForInputSelector);
        const labelsForTextarea = document.querySelectorAll(labelsForTextareaSelector);
        const inputs = document.querySelectorAll(inputSelector);
        const textareas = document.querySelectorAll(textareaSelector);

        function moveLabel(isActive, index, labelName, topValue, translateValue) {
            const label = labelName[index]; // Связываем конкретный инпут с его лейблом
            if (isActive) {
                label.style.cssText = `font-size: 0.8rem; top: ${topValue}px; transform: translateY(-${translateValue}%);`;
            } else {
                label.style.cssText = ''; // Возвращаем лейбл в исходное положение, если инпут пустой
            }
        }

        inputs.forEach((input, index) => {
            input.addEventListener('input', () => moveLabel(input.value.trim() !== '', index, labelsForInput, 10, 150))
        })

        textareas.forEach((textarea, index) => {
            textarea.addEventListener('input', () => moveLabel(textarea.value.trim() !== '', index, labelsForTextarea, 16.6666666667, 250))
        })

    }

    handleFloatingLabel('.label', '.label-comments', '.form input', 'textarea');
}