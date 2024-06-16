if (!window.SR) window.SR = {};

(function () {
	console.log(this);
	document.addEventListener("DOMContentLoaded", ready);

	function ready() {
		try {
			initDropdown();
		} catch (error) {
			console.error(`Error function initDropdown: ${error}`);
		}
	}

	//** Показать/Скрыть выпадающий элемент списка*/
	function initDropdown() {
		console.log("initDropdown()");
		const arTriggerOpen = document.querySelectorAll("[data-dropdown-open]");
		const arTriggerClose = document.querySelectorAll("[data-dropdown-close]");
		const arTriggerToggle = document.querySelectorAll("[data-dropdown-toggle]");

		for (let i = 0; i < arTriggerOpen.length; i++) {
			SR.DropdownHandler(arTriggerOpen[i]);
		}
		for (let i = 0; i < arTriggerClose.length; i++) {
			SR.DropdownHandler(arTriggerClose[i]);
		}
		for (let i = 0; i < arTriggerToggle.length; i++) {
			SR.DropdownHandler(arTriggerToggle[i]);
		}
	}
	SR.DropdownHandler = function ($trigger) {
		$trigger.addEventListener("click", onDropdownHandler);
	};
	function onDropdownHandler() {
		if (this.hasAttribute("data-dropdown-toggle")) {
			dropdownToggle(this, true, "[data-dropdown-toggle]");
		} else if (this.hasAttribute("data-dropdown-open")) {
			dropdownToggle(this, true, "[data-dropdown-open]");
		} else {
			dropdownToggle(this, true, "[data-dropdown-close]");
		}

		function dropdownToggle($btn, isMod = false, attr) {
			console.log($btn);
			const $parent = $btn.closest("[data-dropdown-head]");
			console.log($parent);

			if (!isMod) {
				if ($parent.dataset.dropdownHead !== "sr-active") {
					const arTrigger = document.querySelectorAll(attr);
					arTrigger.forEach($btn => {
						const $parent = $btn.closest("[data-dropdown-head]");
						console.log("parent: ", $parent);
						if ($parent.dataset.dropdownHead === "sr-active") slideUp($parent.nextElementSibling);
						// slideUp($parent.nextElementSibling);
						$parent.dataset.dropdownHead = "";
					});
				}
			}

			if ($parent.dataset.dropdownHead !== "sr-active") {
				$parent.dataset.dropdownHead = "sr-active";
				slideDown($parent.nextElementSibling);
			} else {
				slideUp($parent.nextElementSibling);
				$parent.dataset.dropdownHead = "";
			}
		}

		/* SLIDE UP */
		function slideUp(target, duration = 300) {
			console.log(target.offsetHeight);
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = target.offsetHeight + "px";
			target.style.boxSizing = "border-box";
			target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.style.border = "none";

			window.setTimeout(() => {
				target.style.display = "none";
				target.style.removeProperty("height");
				target.style.removeProperty("padding-top");
				target.style.removeProperty("padding-bottom");
				target.style.removeProperty("margin-top");
				target.style.removeProperty("margin-bottom");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.style.removeProperty("border");
			}, duration);
		}
		/* SLIDE DOWN */
		function slideDown(target, duration = 300) {
			target.style.removeProperty("display");
			let display = window.getComputedStyle(target).display;
			console.log("display: ", display);
			target.style.display = display;
			let height = target.offsetHeight;
			target.style.overflow = "hidden";
			target.style.height = 0;
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;
			target.style.boxSizing = "border-box";
			target.style.transitionProperty = "height, margin, padding";
			target.style.transitionDuration = duration + "ms";
			target.style.height = height + "px";
			target.style.border = "none";

			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			target.style.removeProperty("border");

			window.setTimeout(() => {
				target.style.removeProperty("height");
				target.style.removeProperty("overflow");
				target.style.removeProperty("transition-duration");
				target.style.removeProperty("transition-property");
				target.style.removeProperty("border");
				target.style.removeProperty("box-sizing");
				// $trigger.style.display = "none";
			}, duration);
		}
		/* TOOGLE */
		// const slideToggle = (target, duration = 300) => {
		// 	if (window.getComputedStyle(target).display === "none") {
		// 		return slideDown(target, duration);
		// 	} else {
		// 		return slideUp(target, duration);
		// 	}
		// };
	}
})();
