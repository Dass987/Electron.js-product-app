const electron = require('electron');

class myDom {

	constructor() {
		
		this.products = document.querySelector('#products');
		this.newProduct = document.querySelector('#new-product-form');

		this.nameProduct = document.querySelector('#name');
		this.priceProduct = document.querySelector('#price');
		this.descriptionProduct = document.querySelector('#description');

	}

	formSubmit() {
		
		this.newProduct.addEventListener('submit', e => {
			
			e.preventDefault();
			

		});

	}
	
}

const mydom = new myDom();
mydom.formSubmit();