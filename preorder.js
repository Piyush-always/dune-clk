(() => {
  "use strict";

  const state = {
    color: "metal",
    model: "a",
  };

  const colors = {
    metal: "Metallic",
    wood: "Wooden",
    ceramic: "Ceramic",
  };

  const finishingImages = {
    metal: "assets/metalic.png",
    wood: "assets/wooden.png",
    ceramic: "assets/ceramic.png",
  };

  const models = {
    a: {
      label: "Classic",
      price: 7999,
      features: [
        "Time display",
        "Adjustable brightness",
        "USB-C powered",
      ],
    },
    b: {
      label: "Pro",
      price: 11999,
      features: [
        "Time display",
        "Adjustable brightness",
        "USB-C powered",
        "Alarm",
        "Timer",
        "World clock",
        "Bluetooth app support",
      ],
    },
    c: {
      label: "Ultra",
      price: 14999,
      features: [
        "Time display",
        "Adjustable brightness",
        "USB-C powered",
        "Alarm",
        "Timer",
        "World clock",
        "Bluetooth app support",
        "Voice assistance",
      ],
    },
  };

  const imageStage = document.querySelector(".image-stage");
  const productImage = document.getElementById("product-image");
  const priceEl = document.getElementById("price");
  const colorInput = document.getElementById("selected-color");
  const modelInput = document.getElementById("selected-model");
  const priceInput = document.getElementById("selected-price");
  const detailsRoot = document.getElementById("model-details");
  const detailsToggle = document.getElementById("model-details-toggle");
  const detailsList = document.getElementById("model-details-features");
  const detailsPanel = document.getElementById("model-details-panel");
  const detailsInner = detailsPanel.querySelector(".model-details-inner");

  const formatPrice = (price) => `INR ${price.toLocaleString("en-IN")}`;

  const setPressedState = (selector, attr, value) => {
    document.querySelectorAll(selector).forEach((button) => {
      const selected = button.dataset[attr] === value;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-checked", String(selected));
    });
  };

  const syncPanelHeight = () => {
    if (detailsRoot.classList.contains("is-open")) {
      detailsPanel.style.maxHeight = detailsInner.scrollHeight + "px";
    }
  };

  const setPanelOpen = (open) => {
    detailsRoot.classList.toggle("is-open", open);
    detailsToggle.setAttribute("aria-expanded", String(open));
    detailsPanel.style.maxHeight = open ? detailsInner.scrollHeight + "px" : "0px";
  };

  const renderModelDetails = () => {
    const model = models[state.model];
    detailsList.innerHTML = model.features.map((f) => `<li>${f}</li>`).join("");
    syncPanelHeight();
  };

  const setActiveRazorpay = () => {
    document.querySelectorAll(".razorpay-form").forEach((f) => {
      f.classList.toggle("is-active", f.dataset.model === state.model);
    });
  };

  const updateSelection = (options = {}) => {
    const model = models[state.model];
    const nextImage = finishingImages[state.color];
    const animateImage = options.animateImage !== false;

    setPressedState("[data-color]", "color", state.color);
    setPressedState("[data-model]", "model", state.model);
    imageStage.dataset.color = state.color;
    if (animateImage) imageStage.classList.add("is-changing");
    priceEl.classList.add("is-changing");
    renderModelDetails();
    setActiveRazorpay();

    const apply = () => {
      productImage.src = nextImage;
      productImage.alt = `invengic in ${colors[state.color]}, ${model.label}`;
      priceEl.textContent = formatPrice(model.price);
      colorInput.value = colors[state.color];
      modelInput.value = model.label;
      priceInput.value = String(model.price);
      imageStage.classList.remove("is-changing");
      priceEl.classList.remove("is-changing");
    };

    if (animateImage) {
      window.setTimeout(apply, 160);
    } else {
      apply();
    }
  };

  detailsToggle.addEventListener("click", () => {
    setPanelOpen(!detailsRoot.classList.contains("is-open"));
  });

  document.querySelectorAll("[data-model]").forEach((button) => {
    button.addEventListener("click", () => {
      setPanelOpen(true);
    });
  });

  window.addEventListener("resize", syncPanelHeight);

  document.querySelectorAll("[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
      state.color = button.dataset.color;
      updateSelection();
    });
  });

  document.querySelectorAll("[data-model]").forEach((button) => {
    button.addEventListener("click", () => {
      state.model = button.dataset.model;
      updateSelection({ animateImage: false });
    });
  });

  updateSelection();
})();
