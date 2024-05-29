function calculateExercises() {
    const gender = document.getElementById('gender').value;
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const goalInput = document.getElementById('goal');

    if (!weightInput.value) {
        alert('Введите свой вес!');
        return;
    }
    
    if (!heightInput.value) {
        alert('Введите свой рост!');
        return;
    }

    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const goal = goalInput.value;

    if (isNaN(weight) || isNaN(height)) {
        alert('Вес и рост должны быть числовыми значениями!');
        return;
    }

    if (weight <= 0 || weight > 200) {
        alert('Пожалуйста, введите корректный вес (1-200 кг).');
        return;
    }

    if (height <= 0 || height > 220) {
        alert('Пожалуйста, введите корректный рост (1-220 см).');
        return;
    }

    let result = 'Рекомендуемые упражнения для вас: ';
    let exercises, altExercises;

    switch (goal) {
        case "пресс":
            exercises = ["Скручивания", "Планка", "Велосипед"];
            altExercises = ["Подъем ног лежа", "Косые скручивания"];
            break;
        case "руки":
            exercises = ["Отжимания", "Подтягивания", "Тяга гантелей"];
            altExercises = ["Отжимания узким хватом", "Французский жим"];
            break;
        case "грудь":
            exercises = ["Жим лежа", "Отжимания на брусьях", "Разведение гантелей"];
            altExercises = ["Жим гантелей на наклонной скамье", "Пуловер"];
            break;
        case "ноги":
            exercises = ["Приседания", "Выпады", "Становая тяга"];
            altExercises = ["Подъемы на носки", "Жим ногами"];
            break;
        default:
            exercises = ["Отжимания", "Приседания", "Подтягивания"];
            altExercises = ["Отжимания на брусьях", "Приседания с выпрыгиванием"];
    }

    const days = ["Пн", "Вт", "Ср (выходной)", "Чт", "Пт", "Сб (выходной)", "Вс"];
    let weeklyResult = "";

    let approaches = Math.round(weight / 10); // Исходное количество подходов
    let repetitions = Math.round((height / 100) * 2); // Исходное количество повторений

    if (gender === 'ж') {
        approaches = Math.round(approaches * 0.8); // Уменьшение нагрузки на 20% для женщин
        repetitions = Math.round(repetitions * 0.8); // Уменьшение нагрузки на 20% для женщин
    }

    for (let week = 1; week <= 4; week++) {
        weeklyResult += `<strong>Неделя ${week}:</strong><br>`;

        for (let i = 0; i < days.length; i++) {
            if (i === 2 || i === 5) {
                weeklyResult += `<span class="day">${days[i]}:</span> Выходной<br>`;
            } else {
                weeklyResult += `<span class="day">${days[i]}:</span> ${approaches} подхода, ${repetitions} повторения каждое упражнение - ${exercises.join(", ")}<br>`;
                weeklyResult += `Альтернативные упражнения: ${altExercises.join(", ")}<br>`;
            }
        }

        approaches = Math.round(approaches * 1.3); // Увеличение нагрузки на 1.3 раза
        repetitions = Math.round(repetitions * 1.3); // Увеличение нагрузки на 1.3 раза

        if (gender === 'ж') {
            approaches = Math.round(approaches * 0.8); // Уменьшение нагрузки на 20% для женщин
            repetitions = Math.round(repetitions * 0.8); // Уменьшение нагрузки на 20% для женщин
        }

        weeklyResult += "<br>";
    }

    // Сохраняем результаты в localStorage
    localStorage.setItem('gender', gender);
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('goal', goal);
    localStorage.setItem('result', result);
    localStorage.setItem('weeklyResult', weeklyResult);

    // Перенаправляем пользователя на страницу с результатами
    window.location.href = "result.html";
}
