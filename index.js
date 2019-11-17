"use strict";
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }
  start() {
    this.counterCreate();
    setInterval(() => this.counterChange(this.countDown()), 1000);
  }
  countDown() {
    const time = this.targetDate - Date.now();
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return [days, hours, mins, secs];
  }
  counterCreate() {
    const timer = document.createElement("div");
    timer.textContent = this.selector;
    timer.classList.add("timer");
    timer.setAttribute("id", this.selector);
    timer.insertAdjacentHTML(
      "afterbegin",
      "<div><span></span><span>Days</span></div><div><span></span><span>Hours</span></div><div><span></span><span>Minutes</span></div><div><span></span><span>Seconds</span></div>"
    );
    [...timer.children].forEach(element => {
      element.classList.add("field");
      element.firstElementChild.classList.add("value");
      element.lastElementChild.classList.add("label");
    });
    timer.firstElementChild.firstElementChild.setAttribute(
      "data-value",
      "days"
    );
    timer.firstElementChild.nextElementSibling.firstElementChild.setAttribute(
      "data-value",
      "hours"
    );
    timer.lastElementChild.firstElementChild.setAttribute("data-value", "secs");
    timer.lastElementChild.previousSibling.firstChild.setAttribute(
      "data-value",
      "mins"
    );
    document.body.prepend(timer);
  }
  counterChange(arr) {
    const timer = document.getElementById(this.selector);
    const counts = timer.querySelectorAll(".value");
    counts.forEach((el, idx) =>
      idx !== 0
        ? (el.textContent = String(arr[idx]).padStart(2, "0"))
        : (el.textContent = String(arr[idx]).padStart(3, "0"))
    );
  }
}
const counter = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jan 01, 2020")
});
counter.start();

const counter2 = new Promise(resolve =>
  setTimeout(
    () =>
      resolve(
        new CountdownTimer({
          selector: "#timer-2",
          targetDate: new Date("Jul 17, 2020")
        })
      ),
    3000
  )
);
counter2.then(instance => instance.start());

const counter3 = new Promise(resolve =>
  setTimeout(
    () =>
      resolve(
        new CountdownTimer({
          selector: "#timer-3",
          targetDate: new Date("apr 17, 2020")
        })
      ),
    5000
  )
);
counter3.then(instance => instance.start());
/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);
