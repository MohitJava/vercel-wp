jQuery(document).ready(function ($) {
  var iframe = $("#headless-preview-iframe");
  var loading = $(".headless-preview-loading");
  var fallback = $(".headless-preview-fallback");
  var currentDevice = "desktop";
  var isPreviewOpen = false;
  var debugInterval;

  // Detect conflicts with other scripts
  var originalHide = $.fn.hide;
  $.fn.hide = function () {
    if (this.hasClass("headless-preview-container")) {
      console.log("CONFLICT DETECTED: hide() called on preview container");
      console.trace("Conflict stack trace:");
    }
    return originalHide.apply(this, arguments);
  };

  var originalShow = $.fn.show;
  $.fn.show = function () {
    if (this.hasClass("headless-preview-container")) {
      console.log("show() called on preview container");
    }
    return originalShow.apply(this, arguments);
  };

  // Preview button management
  $(".headless-preview-toggle").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    var button = $(this);
    var url = button.data("url");
    var container = $(".headless-preview-container");

    if (url) {
      openPreview(url, container);
    }
  });

  // Function to open preview
  function openPreview(url, container) {
    // Clean up previous intervals
    if (debugInterval) {
      clearInterval(debugInterval);
      debugInterval = null;
    }

    container.off("click").on("click", function (e) {
      e.stopPropagation();
    });

    container.show();
    isPreviewOpen = true;
    loading.show();
    fallback.hide();

    iframe.attr("src", url);

    // Start loading check
    startIframeCheck();

    // Start blocked iframe detection
    startIframeBlockedDetection();

    // Simple time-based detection (smarter fallback)
    setTimeout(function () {
      if (isPreviewOpen && loading.is(":visible")) {
        // Check if iframe has content before hiding loading
        try {
          var iframeDoc =
            iframe[0].contentDocument || iframe[0].contentWindow.document;
          if (
            iframeDoc &&
            iframeDoc.body &&
            iframeDoc.body.children.length > 0
          ) {
            loading.hide();
            fallback.hide();

            if (debugInterval) {
              clearInterval(debugInterval);
              debugInterval = null;
            }
          } else {
            loading.hide();
            fallback.hide();

            if (debugInterval) {
              clearInterval(debugInterval);
              debugInterval = null;
            }
          }
        } catch (e) {
          // CORS - consider as loaded
          loading.hide();
          fallback.hide();

          if (debugInterval) {
            clearInterval(debugInterval);
            debugInterval = null;
          }
        }
      }
    }, 2000); // Reduced to 2 seconds

    // Continuous debugging
    debugInterval = setInterval(function () {
      // Debug removed for production
    }, 1000);

    // Stop debugging after 10 seconds
    setTimeout(function () {
      if (debugInterval) {
        clearInterval(debugInterval);
        debugInterval = null;
      }
    }, 10000);
  }

  // Refresh button management
  $(".headless-preview-refresh-iframe").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var currentSrc = iframe.attr("src");
    if (currentSrc) {
      loading.show();
      fallback.hide();
      iframe.attr("src", currentSrc + "&t=" + Date.now());
    }
  });

  // Device selection button management
  $(".device-btn").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(".device-btn").removeClass("active").css({
      background: "white",
      color: "#666",
      "border-color": "#ddd",
    });

    $(this).addClass("active").css({
      background: "#0073aa",
      color: "white",
      "border-color": "#0073aa",
    });

    currentDevice = $(this).data("device");
    updateIframeSize();
  });

  function updateIframeSize() {
    var container = $(".headless-preview-iframe-container");
    var width = "100%";

    switch (currentDevice) {
      case "tablet":
        width = "768px";
        break;
      case "mobile":
        width = "375px";
        break;
      default:
        width = "100%";
    }

    iframe.css("width", width);
    iframe.css("max-width", width);
    container.css("display", "flex");
    container.css("justify-content", "center");
  }

  // New tab opening management
  $(
    ".headless-preview-open-new-tab, .headless-preview-open-new-tab-fallback"
  ).on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var url = iframe.attr("src") || $(".headless-preview-toggle").data("url");
    if (url) {
      window.open(url, "_blank");
    }
  });

  // Close management
  $(".headless-preview-close").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(".headless-preview-container").hide();
    isPreviewOpen = false;
    if (debugInterval) {
      clearInterval(debugInterval);
      debugInterval = null;
    }
  });

  // Detect automatic closures
  var container = $(".headless-preview-container");
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "style"
      ) {
        var isVisible = container.is(":visible");
        if (!isVisible && isPreviewOpen) {
          setTimeout(function () {
            if (isPreviewOpen) {
              container.show();
            }
          }, 100);
        }
      }
    });
  });

  // Only observe if container exists
  if (container.length > 0 && container[0]) {
    observer.observe(container[0], {
      attributes: true,
      attributeFilter: ["style"],
    });
  }

  // Additional protection against external scripts
  $(document).on("click", ".headless-preview-container", function (e) {
    e.stopPropagation();
  });

  // Prevent closure by other scripts
  var originalContainerHide = container.hide;
  container.hide = function () {
    if (isPreviewOpen) {
      return this;
    }
    return originalContainerHide.call(this);
  };

  // Iframe loading management
  iframe.on("load", function () {
    loading.hide();
    fallback.hide();

    if (debugInterval) {
      clearInterval(debugInterval);
      debugInterval = null;
    }
  });

  // Alternative iframe loading detection (more robust)
  var checkIframeLoaded;

  function startIframeCheck() {
    // Clean up old interval if it exists
    if (checkIframeLoaded) {
      clearInterval(checkIframeLoaded);
    }

    checkIframeLoaded = setInterval(function () {
      try {
        var iframeDoc =
          iframe[0].contentDocument || iframe[0].contentWindow.document;
        if (iframeDoc && iframeDoc.readyState === "complete") {
          loading.hide();
          fallback.hide();
          clearInterval(checkIframeLoaded);
          checkIframeLoaded = null;

          if (debugInterval) {
            clearInterval(debugInterval);
            debugInterval = null;
          }
        }
      } catch (e) {
        // CORS or iframe loaded but inaccessible
        loading.hide();
        fallback.hide();
        clearInterval(checkIframeLoaded);
        checkIframeLoaded = null;

        if (debugInterval) {
          clearInterval(debugInterval);
          debugInterval = null;
        }
      }
    }, 100); // More frequent

    // Stop checking after 5 seconds
    setTimeout(function () {
      if (checkIframeLoaded) {
        clearInterval(checkIframeLoaded);
        checkIframeLoaded = null;
      }
    }, 5000);
  }

  // Iframe error management
  iframe.on("error", function () {
    loading.hide();
    fallback.show();

    if (debugInterval) {
      clearInterval(debugInterval);
      debugInterval = null;
    }
  });

  // Detect if iframe is blocked (more conservative)
  var iframeBlockedTimeout;

  function startIframeBlockedDetection() {
    // Clean up old timeout if it exists
    if (iframeBlockedTimeout) {
      clearTimeout(iframeBlockedTimeout);
    }

    iframeBlockedTimeout = setTimeout(function () {
      if (isPreviewOpen && loading.is(":visible")) {
        loading.hide();
        fallback.show();

        if (debugInterval) {
          clearInterval(debugInterval);
          debugInterval = null;
        }
      }
    }, 4000); // Reduced to 4 seconds
  }

  // Detect clicks outside the window
  $(document).on("click", function (e) {
    if (
      isPreviewOpen &&
      !$(e.target).closest(".headless-preview-container").length
    ) {
      // Click outside detected - no action needed
    }
  });

  // Detect Escape key
  $(document).on("keydown", function (e) {
    if (e.keyCode === 27 && isPreviewOpen) {
      // Escape key pressed - no action needed
    }
  });

  // Utility functions to get editor content
});
