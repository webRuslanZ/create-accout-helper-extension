document.addEventListener("DOMContentLoaded", () => {

    function transliterate(name) {
        const map = {
            а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y",
            к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
            х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ы: "y", ь: "", ъ: "", э: "e", ю: "yu", я: "ya"
        };

        return name.split('').map(char => map[char] ?? char).join('');
    }

    const swapBtn = document.querySelector('.swap')
    const splitBtn = document.querySelector(".getSplittedName")
    const fullNameBtn = document.querySelector(".getFullName")
    const copyBtn = document.querySelectorAll(".copy")
    const errorTextBlock = document.querySelector('.error-text')
    const splittedReverseNameBtn = document.querySelector(".getSplittedReverseName")
    const fullName = document.querySelector(".name")
    const outputBlock = document.querySelector('.output')
    const outputNameBlock = document.querySelector('.output-name')

    const localStorage = window.localStorage;
    const usernameFromLocalStorage = localStorage.getItem('username')
    const fullNameFromLocalStorage = localStorage.getItem('fullName')
    const passwordFromLocalStorage = localStorage.getItem('password')

    if (usernameFromLocalStorage) {
        outputNameBlock.textContent = JSON.parse(usernameFromLocalStorage)
    }

    if (fullNameFromLocalStorage) {
        fullName.value = JSON.parse(fullNameFromLocalStorage)
    }

    if (passwordFromLocalStorage) {
        outputBlock.textContent = JSON.parse(passwordFromLocalStorage)
    }
    function splitName(fullName) {
        const [firstName, lastName] = fullName.trim().split(" ");
        if (!firstName || !lastName) {
            errorTextBlock.textContent = "Пожалуйста, укажите имя и фамилию через пробел.";
        }
        return [firstName, lastName];
    }

    function swapName(input) {
        input.value = input.value.split(" ").reverse().join(" ");
    }


    function createTransliteratedUsername(fullName, options = { full: false, reverseChars: false }) {
        const { full, reverseChars } = options;

        const [firstName, lastName] = splitName(fullName);
        const lastNameTransliterated = transliterate(lastName);
        if (reverseChars) {
            return `${lastNameTransliterated}.${transliterate(firstName[0])}`
        }
        if (full) {
            return `${transliterate(firstName)}.${lastNameTransliterated}`
        } else {
            return `${transliterate(firstName[0])}.${lastNameTransliterated}`
        }
    }


    swapBtn.addEventListener("click", () => {
        swapName(document.querySelector('.name'))
    })

    function getName(options) {
        const fullNameValue = fullName.value
        errorTextBlock.textContent = ''
        const username = createTransliteratedUsername(fullNameValue.toLowerCase(), options)

        localStorage.setItem("username", JSON.stringify(username))
        localStorage.setItem("fullName", JSON.stringify(fullNameValue))
        outputNameBlock.textContent = username
    }

    splitBtn.addEventListener("click", () => {
        getName()
    });
    fullNameBtn.addEventListener("click", () => {

        getName({ full: true, reverseChars: false })
    });

    splittedReverseNameBtn.addEventListener("click", () => {

        getName({ full: false, reverseChars: true })
    })

    copyBtn.forEach(btn => {
        const btnType = btn.getAttribute('data-btn')

        btn.addEventListener("click", () => {
            copyTextFromDiv(btnType)
        })
    })
    function copyTextFromDiv(btnType) {
        let text;

        if (btnType === 'name') {
            text = outputNameBlock.textContent
        } else {
            text = outputBlock.textContent
        }
        navigator.clipboard.writeText(text)
            .catch((error) => {
                errorTextBlock.textContent = `Ошибка при копировании текста: ${error}`
            });

    }

    function generatePassword(count) {
        const uppercaseLetters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        const lowercaseLetters = 'abcdefghjkmnpqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!№%?=@#';

        // Функции для случайного выбора символов
        const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

        // Генерация обязательных символов
        const uppercaseChar = getRandomChar(uppercaseLetters);
        const numberChar = getRandomChar(numbers);
        const symbolChar = getRandomChar(symbols);

        // Генерация оставшихся 5 строчных букв
        let lowercaseChars = '';
        for (let i = 0; i < count - 3; i++) {
            lowercaseChars += getRandomChar(lowercaseLetters);
        }

        // Составление пароля и перемешивание символов
        const passwordArray = [uppercaseChar, numberChar, symbolChar, ...lowercaseChars].sort(() => Math.random() - 0.5);

        return passwordArray.join('');
    }

    const generatePassBtn = document.querySelectorAll('.getRandomPassword')

    generatePassBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const count = btn.getAttribute('data-count')
            const password = generatePassword(count)
            localStorage.setItem("password", JSON.stringify(password))
            outputBlock.textContent = password
        })
    })






})



