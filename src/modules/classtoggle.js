/**
 * Logic for toggling a class between corresponding trigger and element,
 * will apply to multiple if they exist.
 * Author: Imarc 2019
 *
 * Match-up "data-toggle" data attributes between corresponding element and trigger
 *
 * @param Object Configuration
 */

export default function expand(passedConfig) {
    const config = {
        elementClass: passedConfig.elementClass || '.js-expand',
        triggerClass: passedConfig.triggerClass || '.js-expandTrigger',
        toggleClass: passedConfig.toggleClass || '-expanded',
        swapText: passedConfig.swapText || null,
        preventDefault: !passedConfig.preventDefault ? passedConfig.preventDefault : true,
    };

    const triggers = [...document.querySelectorAll(config.triggerClass)];
    const elements = [...document.querySelectorAll(config.elementClass)];

    triggers.forEach(function applyClickEvent(trigger) {
        const initialText = trigger.innerHTML;

        trigger.addEventListener('click', function findMatchingElement(e) {
            if (config.preventDefault) {
                // Prevent form submission if applicable
                e.preventDefault();
            }

            elements.forEach(function expandElement(element) {
                if (element.dataset.toggle === trigger.dataset.toggle) {
                    element.classList.toggle(config.toggleClass);

                    if (config.swapText) {
                        // eslint-disable-next-line no-param-reassign
                        trigger.innerHTML =
                            trigger.innerHTML !== config.swapText
                                ? config.swapText
                                : initialText;
                    }
                }
            });
        });
    });
}
