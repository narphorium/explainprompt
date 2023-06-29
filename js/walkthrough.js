function buildButton(iconName, onclick) {
    var button = document.createElement('button');
    var icon = document.createElement('span');
    icon.classList.add('material-icons');
    icon.classList.add('material-icons-outlined');
    icon.innerText = iconName;
    button.appendChild(icon);
    button.onclick = onclick;
    return button;
  }
  
  function Walkthrough(controls, data) {
    this.description_by_step = data['steps'];
    this.current_step = 0;
    this.num_steps = data['steps'].length;
  
    controls.appendChild(buildButton('first_page', () => {
      this.goto(0);
    }));
    controls.appendChild(buildButton('chevron_left', () => {
      this.goto(this.current_step - 1);
    }));
    this.position = document.createElement('span');
    this.position.setAttribute('id', 'position');
    controls.appendChild(this.position);
    controls.appendChild(buildButton('chevron_right', () => {
      this.goto(this.current_step + 1);
    }));
    controls.appendChild(buildButton('last_page', () => {
      this.goto(this.num_steps-1);
    }));

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
          break;
        case 'p':
        case 'up':
        case 'pageup':
        case 'left':
        case 'backspace':
          this.goto(this.current_step - 1);
          break;
        case 'home':
          this.goto(0);
          break;
        case 'end':
          this.goto(this.num_steps - 1);
          break;
      }
      event.stopPropagation();
      event.preventDefault();
    });
  
    window.addEventListener('load',  () => {
      document.querySelectorAll('mark').forEach((mark) => {
        mark.addEventListener('click', (el, e) => {
          this.goto(parseInt(mark.dataset.step));
        }, true)
      });
      this.goto(0);
    });
    
  }

function openDetail(detail) {
    const is_open = detail.hasAttribute('open');
    detail.setAttribute('prev-open', is_open);
    detail.setAttribute('open', 'true');

    let parent = detail.parentNode.closest('details');
    console.log('parent', parent);
    if (parent && parent != detail) {
        openDetail(parent);
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
    if (step >= 0 && step < this.num_steps) {
      this.current_step = step;
      this.position.innerText = (this.current_step + 1) + ' of ' + this.num_steps;
      this.description.innerHTML = this.description_by_step[this.current_step]['description'];

      document.querySelectorAll('details').forEach((detail) => {
        if (detail.dataset.step == this.current_step) {
            openDetail(detail);
        } else if (detail.hasAttribute('prev-open')) {
            closeDetail(detail);
        }
      })

      document.querySelectorAll('*[data-step]').forEach((mark) => {
        if (mark.dataset.step == this.current_step) {
          mark.classList.add('selected');
          window.scrollTo({
            top: mark.offsetTop - 100,
            behavior: "smooth"
          });
        } else {
            mark.classList.remove('selected');
        }
      })
    }
  }