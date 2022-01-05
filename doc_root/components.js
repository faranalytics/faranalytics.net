class FadeHeaderComponent extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {

        const observer = new MutationObserver((mutationList, observer) => {

            observer.disconnect();

            let computedStyle = window.getComputedStyle(this);

            let placeholder = document.createElement('div');

            placeholder.style.height = computedStyle['height'];
            placeholder.style.marginBottom = computedStyle['marginBottom'];

            this.after(placeholder);

            this.style.position = 'fixed';

            this.style.zIndex = `1`;

            let lastScrollY = 0;

            let scrollUp = 0;

            document.addEventListener('scroll', (event) => {

                if (lastScrollY > window.scrollY) {

                    scrollUp++;
                }
                else if (window.scrollY > parseInt(computedStyle.marginBottom)) {

                    this.style.transitionProperty = 'opacity';
                    this.style.transitionDuration = '.5s';
                    this.style.opacity = '0';
                    scrollUp = 0;
                }

                if (
                    window.scrollY < parseInt(computedStyle.marginBottom) ||
                    scrollUp == 24
                ) {

                    this.style.opacity = '1';
                    scrollUp = 0;
                }

                lastScrollY = window.scrollY;
            });

        });

        observer.observe(this, { childList: true, subtree: true });
    }
}


class HeaderMenu extends HTMLElement {
    constructor() {
        super();

        const observer = new MutationObserver((mutationList, observer) => {

            observer.disconnect();

            let ul = this.querySelector('nav > ul');
            let nav = this.querySelector('nav');

            let navRight = nav.getBoundingClientRect().right;

            // nav.style.visibility = 'hidden';

            let maxRight = mutationList.reduce((p, c) => {

                if (c.addedNodes[0]?.getBoundingClientRect) {

                    let right = c.addedNodes[0]?.getBoundingClientRect().right;

                    if (right > p) {
                        p = right;
                    }
                }

                return p;
            }, 0);


            ul.style.right = (maxRight - navRight) + 'px';

        });

        observer.observe(this, { childList: true, subtree: true });
    }

    connectedCallback() {

    }
}

customElements.define('header-menu', HeaderMenu);
customElements.define('fade-header-component', FadeHeaderComponent);

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
  }
  

