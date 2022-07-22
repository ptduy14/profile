const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navItems = $$('.body-content-nav li');
const line = $('.line');
const contentBlocks = $$('.content');
const header = $('header');
const persentNumbers = $$('.persent-number'); 
const btnOpenMoreInfo = $('.btn-more');
const overlay = $('.overlay');
const moreInfoBox = $('.more-info-box');
const btnCloseMoreInfo = $('.close-more-info');
const inputName = $('#name-input');
const inputEmail = $('#email-input');
const textArea = $('#text-input');
const submitBtn = $('#submit-btn');
const toastSuccess = $('.toastSuccess');
const btnCloseToast = $('.close-toast');

var interval = 1000;

line.style.left = navItems[0].offsetLeft + 'px';
line.style.width = navItems[0].offsetWidth + 'px';

const app = {
    isValid: true,
    activeNavItem: function () {
        navItems.forEach(function (navItem, index) {
            navItem.onclick = function () {
                // query current content active
                const contentActive= $('.content.active');
                contentActive.classList.remove('active');

                // add active class to new content
                contentBlocks[index].classList.add('active');


                line.style.left = this.offsetLeft + 'px';
                line.style.width = this.offsetWidth + 'px';
                
                app.numberCounting();
            }
        });
    },
    numberCounting: function () {
        persentNumbers.forEach(function (persentNumber) {
            let startValue = 0;
            let endValue = persentNumber.dataset.number;
            let duration = Math.floor(interval / endValue);
            
            let counter = setInterval(function () {
                startValue += 1;
                persentNumber.textContent = startValue + '%';
                
                if (startValue == endValue) {
                    clearInterval(counter);
                }
            },duration)
        });
    },
    openMoreInfo: function () {
        btnOpenMoreInfo.onclick = function () {
            overlay.classList.add('active');
            
            setTimeout(function () {
                moreInfoBox.classList.add('active');
            },200);
        }
    },
    btnCloseMoreInfo: function () {
        btnCloseMoreInfo.onclick = function () {
            
            moreInfoBox.classList.remove('active');
            setTimeout(function () {
                overlay.classList.remove('active');
            },500);
        }

        overlay.onclick = function () {
            moreInfoBox.classList.remove('active');
            setTimeout(function () {
                overlay.classList.remove('active');
            },500);
        }
    },
    formEvent: function () {
        inputName.onblur = function () {
            app.handleValidate(inputName);
        }

        inputEmail.onblur = function () {
            app.handleValidate(inputEmail);
        }

        textArea.onblur = function () {
            app.handleValidate(textArea);
        }

        // khi các input đang đc nhập
        inputName.oninput = function () {
            app.removeError(inputName);
        }

        inputEmail.oninput = function () {
            app.removeError(inputEmail);
        }

        textArea.oninput = function () {
            app.removeError(textArea);
        }

        submitBtn.onclick = function (e) {
            e.preventDefault();
            app.submitForm();
            if (app.isValid) {
                toastSuccess.classList.add('active');
                setTimeout(function () {
                    toastSuccess.classList.remove('active');
                }, 5000);
            }
        }

        btnCloseToast.onclick = function () {
            toastSuccess.classList.remove('active');
        }


    },
    handleValidate: function (inputField) {
        var valueInputField = inputField.value;
        var formGroup = inputField.parentElement;
            if (!valueInputField.trim()) {
                formGroup.classList.add('error');
                formGroup.querySelector('.msg-span').textContent = 'this field not null';
            } else {
                formGroup.classList.remove('error');
                formGroup.querySelector('.msg-span').textContent = '';
            }
    },
    removeError: function (inputField) {
        var formGroup = inputField.parentElement;
        formGroup.classList.remove('error');
        formGroup.querySelector('.msg-span').textContent = '';
    },
    submitForm: function () {
        app.handleValidate(inputName);
        app.handleValidate(inputEmail);
        app.handleValidate(textArea);
        var allFormGroup = $$('.form-group');
        for (let i = 0; i < allFormGroup.length; i++) {
            var msgSpan = allFormGroup[i].querySelector('.msg-span');
            if (msgSpan.textContent != '') {
                app.isValid = false;
                break;
            } else {
                app.isValid = true;
            }
        }
    },
    start: function () {
        this.activeNavItem();
        this.openMoreInfo();
        this.btnCloseMoreInfo();
        this.formEvent();
    }
}

app.start();