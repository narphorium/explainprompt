function buildButton(iconName, title, onclick) {
    var button = document.createElement('button');
    button.setAttribute('title', title);
    var icon = document.createElement('span');
    icon.classList.add('material-icons');
    icon.classList.add('material-icons-outlined');
    icon.innerText = iconName;
    button.appendChild(icon);
    button.onclick = onclick;
    return button;
  }

  function pulseButton(button) {
    if (button.classList.contains('pulse1')) {
        button.classList.remove('pulse1');
        button.classList.add('pulse2');
    } else {
        button.classList.remove('pulse2');
        button.classList.add('pulse1');
    }
}
  
  function Walkthrough(controls) {
    this.current_step = -1;
  
    this.first_button = buildButton('first_page', 'Return to start [home]', () => {
        this.goto(0);
    });
    this.last_button = buildButton('last_page', 'Jump to end [end]', () => {
        this.goto(this.num_steps-1);
    });
    this.prev_button = buildButton('chevron_left', 'Previous step [←]', () => {
        this.goto(this.current_step - 1);
    });
    this.next_button = buildButton('chevron_right', 'Next step [→]', () => {
        this.goto(this.current_step + 1);
      })
    controls.appendChild(this.first_button);
    controls.appendChild(this.prev_button);
    this.position = document.createElement('span');
    this.position.setAttribute('id', 'position');
    controls.appendChild(this.position);
    controls.appendChild(this.next_button);
    controls.appendChild(this.last_button);

    this.description = document.getElementById('description');
  
    if (location.hash.length > 0) {
      this.goto(parseInt(location.hash.slice(1))-1);
    } else {
      this.goto(0);
    }
  
    hotkeys('n,enter,down,pagedown,right,space,p,up,pageup,left,backspace,home,end', (event, handler) => {
      switch (handler.key) {
        case 'n':
        case 'enter':
        case 'down':
        case 'pagedown':
        case 'right':
        case 'space':
          this.goto(this.current_step + 1);
          pulseButton(this.next_button);
          break;
        case 'p':
        case 'up':
        case 'pageup':
        case 'left':
        case 'backspace':
          this.goto(this.current_step - 1);
          pulseButton(this.prev_button);
          break;
        case 'home':
          this.goto(0);
          pulseButton(this.first_button);
          break;
        case 'end':
          this.goto(this.num_steps - 1);
          pulseButton(this.last_button);
          break;
      }
      event.stopPropagation();
      event.preventDefault();
    });
  
    window.addEventListener('load',  () => {
        const step_data = document.querySelectorAll('.trajectory *[data-step]');
        step_data.forEach((mark) => {
            mark.addEventListener('click', (e) => {
                if (mark.dataset.step != this.current_step) {
                    e.preventDefault();
                }
                this.goto(parseInt(mark.dataset.step));
            });
        });
        this.num_steps = step_data.length;
        this.goto(0);
    });
    
  }

function openDetail(detail) {
    const is_open = detail.hasAttribute('open');
    detail.setAttribute('prev-open', is_open);
    detail.setAttribute('open', 'true');
}

function openParentDetails(detail) {
    let parent = detail.parentNode.closest('details');
    if (parent && parent != detail) {
        const is_open = parent.hasAttribute('open');
        parent.setAttribute('prev-open', is_open);
        parent.setAttribute('open', 'true');
        openParentDetails(parent);
    }
}

function closeDetail(detail) {
    const prev_open = detail.getAttribute('prev-open');
    if (prev_open == 'true') {
        detail.setAttribute('open', 'true');
    } else {
        detail.removeAttribute('open');
    }
    detail.removeAttribute('prev-open');
}
  
  Walkthrough.prototype.goto = function(step) {
    if (step >= 0 && step < this.num_steps && step != this.current_step) {
      this.current_step = step;
      this.position.innerText = (this.current_step + 1) + ' of ' + this.num_steps;

      // Close all details that were open in the previous step
      // I commented this out because it was causing the page to jump around and make it harder to follow the walkthrough
      // document.querySelectorAll('details').forEach((detail) => {
      //   if (detail.dataset.step != this.current_step && detail.hasAttribute('prev-open')) {
      //       closeDetail(detail);
      //   }
      // })

      var scroll_target = Number.MAX_SAFE_INTEGER;
      document.querySelectorAll('.trajectory *[data-step]').forEach((mark) => {
        if (mark.dataset.step == this.current_step) {
          mark.classList.add('selected');
          if (mark.tagName == 'DETAILS') {
            openDetail(mark);
          }
          openParentDetails(mark);
          scroll_target = Math.min(scroll_target, mark.offsetTop - 260);
        } else {
            mark.classList.remove('selected');
        }
      });
      window.scrollTo({top: scroll_target, behavior: "smooth"});

      document.querySelectorAll('.aside *[data-step]').forEach((mark) => {
        if (mark.dataset.step == this.current_step) {
          mark.classList.add('selected');
        } else {
            mark.classList.remove('selected');
        }
      });
    }
  }