type EnhanceOptions = {
  observe?: boolean; // watch for new selects added later
  debug?: boolean; // enable console logs
  retryMs?: number; // how long to retry initial enhancement window
};

function log(debug: boolean, ...args: any[]) {
  if (debug) console.debug('[enhanceSelects]', ...args);
}

export function enhanceSelects(opts: EnhanceOptions = {}) {
  const { observe = true, debug = false, retryMs = 1200 } = opts;

  const enhanceOnce = (select: HTMLSelectElement) => {
    if (select.dataset.enhanced) {
      log(debug, 'already enhanced', select);
      return;
    }
    select.dataset.enhanced = 'true';

    try {
      // hide native select
      select.style.display = 'none';
    } catch (e) {}

    // wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'relative inline-block w-full';

    // visible button
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'listbox');
    button.setAttribute('aria-expanded', 'false');
    button.className =
      'w-full text-left bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 cursor-pointer focus:ring-1 focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]';

    // get the selected option's label (prefer data-label, then rendered innerText)
    const selected = select.options[select.selectedIndex];
    const selectedLabel =
      selected?.getAttribute('data-label')?.trim() ||
      selected?.innerText?.trim() ||
      selected?.text?.trim() ||
      'Select';
    button.textContent = selectedLabel;

    // list
    const dropdown = document.createElement('ul');
    dropdown.className =
      'absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto hidden';
    dropdown.setAttribute('role', 'listbox');

    // build options
    Array.from(select.options).forEach((option) => {
      const label =
        option.getAttribute('data-label')?.trim() ||
        option.innerText?.trim() ||
        option.text?.trim() ||
        '';

      const li = document.createElement('li');
      li.className = 'cursor-pointer px-3 py-2 hover:bg-gray-100';
      li.setAttribute('role', 'option');
      li.textContent = label;

      if (option.disabled) {
        li.classList.add('opacity-50', 'cursor-not-allowed');
        li.setAttribute('aria-disabled', 'true');
      }

      li.addEventListener('click', () => {
        if (option.disabled) return;
        select.value = option.value;
        // update native selectedIndex for accessibility if necessary
        try {
          select.selectedIndex = Array.prototype.indexOf.call(
            select.options,
            option,
          );
        } catch {}
        button.textContent = label;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        dropdown.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
      });

      dropdown.appendChild(li);
    });

    // toggle
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const hidden = dropdown.classList.contains('hidden');
      if (hidden) {
        dropdown.classList.remove('hidden');
        button.setAttribute('aria-expanded', 'true');
      } else {
        dropdown.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    // close when clicking outside
    const docClick = (e: MouseEvent) => {
      if (!wrapper.contains(e.target as Node)) {
        dropdown.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
      }
    };
    document.addEventListener('click', docClick);

    // replace in DOM
    wrapper.appendChild(button);
    wrapper.appendChild(dropdown);
    select.parentNode?.insertBefore(wrapper, select);

    log(debug, 'enhanced select', select);
  };

  const enhanceAllNow = () => {
    const selects = Array.from(
      document.querySelectorAll<HTMLSelectElement>('select'),
    );
    if (selects.length === 0) {
      log(debug, 'no selects found yet');
    }
    selects.forEach(enhanceOnce);
    return selects.length;
  };

  // Try to run immediately; if nothing found, keep retrying for a short window
  let attempts = 0;
  const maxAttempts = Math.max(1, Math.ceil(retryMs / 100));
  const intervalId = window.setInterval(() => {
    attempts++;
    const count = enhanceAllNow();
    if (count > 0 || attempts >= maxAttempts) {
      clearInterval(intervalId);
      log(
        debug,
        'initial enhancement done (attempts)',
        attempts,
        'found',
        count,
      );
    }
  }, 100);

  // Watch for selects added later (e.g. client navigation)
  if (observe && typeof MutationObserver !== 'undefined') {
    const mo = new MutationObserver((mutations) => {
      let added = 0;
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (!(node instanceof Element)) continue;
          // newly added select
          if (node.tagName === 'SELECT') {
            enhanceOnce(node as HTMLSelectElement);
            added++;
          }
          // or select nested inside added subtree
          const nested = node.querySelectorAll?.('select') || [];
          nested.forEach((s: Element) => {
            enhanceOnce(s as HTMLSelectElement);
            added++;
          });
        }
      }
      if (added) log(debug, 'MutationObserver enhanced selects', added);
    });

    mo.observe(document.body, { childList: true, subtree: true });
    log(debug, 'mutation observer started');
  }

  return {
    stopObserving: () => {
      // noop for now; MutationObserver not exposed. Could be extended to return the mo.
      log(debug, 'stopObserving called (noop)');
    },
  };
}
