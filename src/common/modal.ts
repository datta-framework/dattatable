import { Components } from "gd-sprest-bs";

/**
 * Modal
 */
export class Modal {
    private static _modal: Components.IModal = null;
    private static _onCloseEvent: Function = null;

    // Modal Body
    private static _elBody: HTMLElement = null;
    static get BodyElement(): HTMLElement { return this._elBody; }

    // Modal Footer
    private static _elFooter: HTMLElement = null;
    static get FooterElement(): HTMLElement { return this._elFooter; }

    // Modal Header
    private static _elHeader: HTMLElement = null;
    static get HeaderElement(): HTMLElement { return this._elHeader; }

    // Constructor
    constructor() {
        // Render the canvas
        Modal.render();
    }

    // Clears the canvas form
    static clear() {
        // Clear the header, body and footer
        this.setHeader("");
        this.setBody("");
        this.setFooter("");

        // Set the default properties
        this.setAutoClose(false);
        this.setBackdrop(true);
        this.setCloseButtonVisibility(true);
        this.setCloseEvent(null);
        this.setFocus(false);
        this.setIsCentered(true);
        this.setKeyboard(true);
        this.setScrollable(false);
        this.setType(Components.ModalTypes.Large);

        // Ensure the header, body and footer are visible
        this._elBody.classList.remove("d-none");
        this._elFooter.classList.remove("d-none");
        this._elHeader.classList.remove("d-none");
    }

    // Hides the modal
    static hide() {
        // Hide the modal
        this._modal.hide();

        // Call the close event
        this._onCloseEvent ? this._onCloseEvent() : null;
    }

    // Renders the canvas
    private static render() {
        // Create the element
        let el = document.createElement("div");
        el.id = "core-modal";

        // Ensure the body exists
        if (document.body) {
            // Append the element
            document.body.appendChild(el);
        } else {
            // Create an event
            window.addEventListener("load", () => {
                // Append the element
                document.body.appendChild(el);
            });
        }

        // Render the canvas
        this._modal = Components.Modal({
            el,
            type: Components.ModalTypes.Large,
            options: {
                autoClose: false,
                backdrop: true,
                centered: true,
                keyboard: true
            },
            onRenderBody: el => { this._elBody = el; },
            onRenderFooter: el => { this._elFooter = el; },
            onRenderHeader: el => { this._elHeader = el.querySelector(".modal-title");; },
            onClose: () => {
                // Call the close event
                this._onCloseEvent ? this._onCloseEvent() : null;
            }
        });
    }

    // Sets the auto close flag
    static setAutoClose(value: boolean) { this._modal.setAutoClose(value); }

    // Sets the backdrop option
    static setBackdrop(value: boolean) { this._modal.setBackdrop(value); }

    // Sets the body
    static setBody(content) {
        // Clear the body
        while (this._elBody.firstChild) { this._elBody.removeChild(this._elBody.firstChild); }

        // See if content exists
        if (content) {
            // See if this is text
            if (typeof (content) == "string") {
                // Set the html
                this._elBody.innerHTML = content;
            } else {
                // Append the element
                this._elBody.appendChild(content);
            }
        }
    }

    // Sets the close button visibility
    static setCloseButtonVisibility(showFl: boolean) { this._modal.setCloseButtonVisibility(showFl); }

    // Sets the close event
    static setCloseEvent(event) { this._onCloseEvent = event; }

    // Sets the focus option
    static setFocus(value: boolean) { this._modal.setFocus(value); }

    // Sets the footer
    static setFooter(content) {
        // Clear the body
        while (this._elFooter.firstChild) { this._elFooter.removeChild(this._elFooter.firstChild); }

        // See if content exists
        if (content) {
            // See if this is text
            if (typeof (content) == "string") {
                // Set the html
                this._elFooter.innerHTML = content;
            } else {
                // Append the element
                this._elFooter.appendChild(content);
            }
        }
    }

    // Sets the header
    static setHeader(content) {
        // Clear the body
        while (this._elHeader.firstChild) { this._elHeader.removeChild(this._elHeader.firstChild); }

        // See if content exists
        if (content) {
            // See if this is text
            if (typeof (content) == "string") {
                // Set the html
                this._elHeader.innerHTML = content;
            } else {
                // Append the element
                this._elHeader.appendChild(content);
            }
        }
    }

    // Sets the center option
    static setIsCentered(value: boolean) { this._modal.setIsCentered(value); }

    // Sets the keyboard option
    static setKeyboard(value: boolean) { this._modal.setKeyboard(value); }

    // Sets the scrollable option
    static setScrollable(value: boolean) { this._modal.setScrollable(value); }

    // Sets the modal type
    static setType(type) { this._modal.setType(type); }

    // Shows the modal
    static show() {
        // See if the footer is empty
        if (!this.FooterElement.hasChildNodes) {
            // Hide the footer
            this.FooterElement.classList.add("d-none");
        }

        // Show the modal
        this._modal.show();
    }
}

// Create an instance of the modal
new Modal();