// Shared Subs - local-first logic for GitHub Pages.
// Storage: localStorage key sharedSubs.v1. No server, no tracking.

const STORAGE_KEY = "sharedSubs.v1";
const LANG_KEY = "sharedSubs.lang";

const TEMPLATES = {
  es: "Hola {name}, tu parte de {service} de {month} es {amount}. Gracias.",
  en: "Hi {name}, your share for {service} {month} is {amount}. Thanks!"
};

const STRINGS = {
  es: {
    skip: "Saltar al contenido",
    brandSub: "Local · Estático · Sin cuenta",
    month: "Mes",
    monthAria: "Mes de facturación",
    export: "Exportar",
    import: "Importar",
    headline: "Cobra tu parte sin perseguir a nadie.",
    lede: "Define cada suscripción una vez con sus contactos exactos y su mensaje exacto. Cada mes abre WhatsApp con el texto listo y marca los pagos. Tus datos nunca salen de este navegador.",
    stSubs: "suscripciones",
    stDue: "pendientes",
    stPaid: "pagados",
    subs: "Suscripciones",
    newSub: "Nueva suscripción",
    toolbarAria: "Barra de suscripciones",
    howTitle: "Cómo funciona el cobro mensual",
    how1: "Elige el mes de facturación arriba.",
    how2: "Revisa cada suscripción y el importe por persona.",
    how3: "Pulsa WhatsApp en la fila del contacto. El chat se abre con el mensaje listo, solo tienes que enviarlo.",
    how4: "Marca Pagado cuando recibas la parte correspondiente.",
    privacy: "Privacidad: los contactos y las plantillas solo se guardan en localStorage bajo sharedSubs.v1. El repositorio público incluye datos de ejemplo ficticios.",
    subDlg: "Suscripción",
    fName: "Nombre",
    fTotal: "Total mensual",
    fCur: "Moneda",
    fDay: "Día de cobro",
    fTpl: "Plantilla del mensaje",
    vars: "Variables:",
    cancel: "Cancelar",
    save: "Guardar",
    ctDlg: "Contacto",
    cName: "Nombre",
    cPhone: "Teléfono con código de país",
    cHint: "Usa solo dígitos con código de país. Ejemplo: 34600000001. Los enlaces usan wa.me.",
    footer: "Versión estática para GitHub Pages. Sin seguimiento, sin servidor, sin coste.",
    guide: "Guía de instalación y despliegue",
    each: "cada uno",
    addContact: "Añadir contacto",
    edit: "Editar",
    delete: "Eliminar",
    paid: "Pagado",
    noSubs: "Aún no hay suscripciones. Elige Nueva suscripción para empezar.",
    invalidBackup: "Archivo de copia no válido.",
    removeOf: "Eliminar a",
    markPaidOf: "Marcar a",
    markPaidSuffix: "como pagado en",
    total: "Total",
    day: "Día",
    paidIn: "pagados en",
    title: "Shared Subs - Gestor local",
    description: "Gestor local de suscripciones compartidas. Tus datos permanecen en tu navegador.",
    switchAria: "Switch to English"
  },
  en: {
    skip: "Skip to content",
    brandSub: "Local-first · Static · No account",
    month: "Month",
    monthAria: "Billing month",
    export: "Export",
    import: "Import",
    headline: "Collect your share without the manual chase.",
    lede: "Define each subscription once with its exact contacts and exact message. Each month open WhatsApp with the text ready and tick off payments. Data never leaves this browser.",
    stSubs: "subscriptions",
    stDue: "pending",
    stPaid: "paid",
    subs: "Subscriptions",
    newSub: "New subscription",
    toolbarAria: "Subscriptions toolbar",
    howTitle: "How monthly collection works",
    how1: "Pick the billing month at the top.",
    how2: "Open each subscription and review the per-person amount.",
    how3: "Select WhatsApp on a contact row. The chat opens with the message ready, you press send.",
    how4: "Tick Paid when the share arrives.",
    privacy: "Privacy: contacts and templates are stored only in localStorage under sharedSubs.v1. The public repo ships with fake example data.",
    subDlg: "Subscription",
    fName: "Name",
    fTotal: "Total monthly",
    fCur: "Currency",
    fDay: "Charge day",
    fTpl: "Message template",
    vars: "Variables:",
    cancel: "Cancel",
    save: "Save",
    ctDlg: "Contact",
    cName: "Name",
    cPhone: "Phone with country code",
    cHint: "Use digits only with country code. Example: 34600000001. Links use wa.me.",
    footer: "Static build for GitHub Pages. No tracking, no server, no cost.",
    guide: "Setup and deploy guide",
    each: "each",
    addContact: "Add contact",
    edit: "Edit",
    delete: "Delete",
    paid: "Paid",
    noSubs: "No subscriptions yet. Select New subscription to start.",
    invalidBackup: "Invalid backup file.",
    removeOf: "Remove",
    markPaidOf: "Mark",
    markPaidSuffix: "as paid for",
    total: "Total",
    day: "Day",
    paidIn: "paid in",
    title: "Shared Subs - Local Manager",
    description: "Local-first manager for shared subscriptions. Data stays in your browser.",
    switchAria: "Cambiar a español"
  }
};

function getLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

function t(key) {
  const lang = getLang();
  return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.es[key] || key;
}

function defaultTemplate() {
  return TEMPLATES[getLang()] || TEMPLATES.es;
}

function exampleData() {
  const template = TEMPLATES.es;
  return {
    subscriptions: [
      {
        id: "ex-spotify",
        name: "Spotify Familiar",
        totalMonthly: 17.99,
        currency: "EUR",
        dayOfMonth: 1,
        template,
        contacts: [
          { id: "ex-c1", name: "Alex Ejemplo", phone: "34600000001" },
          { id: "ex-c2", name: "Sam Ejemplo", phone: "34600000002" }
        ]
      },
      {
        id: "ex-video",
        name: "Plan de video",
        totalMonthly: 12.99,
        currency: "EUR",
        dayOfMonth: 1,
        template,
        contacts: [
          { id: "ex-c3", name: "Jordan Ejemplo", phone: "34600000003" }
        ]
      }
    ],
    paid: {}
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = exampleData();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.subscriptions) return exampleData();
    if (!parsed.paid) parsed.paid = {};
    return parsed;
  } catch {
    return exampleData();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 10000)}`;
}

function digitsOnly(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function currentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function shareAmount(sub) {
  const count = sub.contacts.length || 1;
  const total = Number(sub.totalMonthly || 0);
  return total / count;
}

function formatMoney(value, currency) {
  const amount = Number(value || 0);
  const locale = getLang() === "es" ? "es-ES" : "en-IE";
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currency || "EUR" }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency || ""}`.trim();
  }
}

function renderTemplate(template, vars) {
  return String(template || defaultTemplate())
    .replaceAll("{name}", vars.name || "")
    .replaceAll("{amount}", vars.amount || "")
    .replaceAll("{service}", vars.service || "")
    .replaceAll("{month}", vars.month || "");
}

function waLink(phone, text) {
  const digits = digitsOnly(phone);
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

function isPaid(state, subId, monthKey, contactId) {
  return Boolean(state.paid?.[subId]?.[monthKey]?.[contactId]);
}

function setPaid(state, subId, monthKey, contactId, value) {
  state.paid[subId] = state.paid[subId] || {};
  state.paid[subId][monthKey] = state.paid[subId][monthKey] || {};
  if (value) state.paid[subId][monthKey][contactId] = true;
  else delete state.paid[subId][monthKey][contactId];
}

const TRASH_SVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4.5h12M6.5 4.5V3h3v1.5M3.5 4.5l.7 8a1 1 0 0 0 1 .9h5.6a1 1 0 0 0 1-.9l.7-8M6.6 7v4M9.4 7v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const WA_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';

// Expose pure helpers for structural checks.
window.SharedSubs = { digitsOnly, renderTemplate, waLink, shareAmount, formatMoney };

function applyI18n() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.title = STRINGS[lang].title;
  const meta = document.querySelector('meta[data-i18n-meta="description"]');
  if (meta) meta.setAttribute("content", STRINGS[lang].description);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (STRINGS[lang][key] !== undefined) el.textContent = STRINGS[lang][key];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (STRINGS[lang][key] !== undefined) el.setAttribute("aria-label", STRINGS[lang][key]);
  });
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.textContent = lang === "es" ? "EN" : "ES";
    langBtn.setAttribute("aria-label", STRINGS[lang].switchAria);
  }
}

function main() {
  let state = loadState();
  applyI18n();
  const monthPicker = document.getElementById("monthPicker");
  const subList = document.getElementById("subList");
  const statSubs = document.getElementById("statSubs");
  const statDue = document.getElementById("statDue");
  const statPaid = document.getElementById("statPaid");
  let editingSubId = null;
  let activeSubIdForContact = null;

  if (!monthPicker.value) monthPicker.value = currentMonthKey();

  function refreshStats() {
    const monthKey = monthPicker.value || currentMonthKey();
    let due = 0;
    let paid = 0;
    for (const sub of state.subscriptions) {
      for (const c of sub.contacts) {
        if (isPaid(state, sub.id, monthKey, c.id)) paid += 1;
        else due += 1;
      }
    }
    statSubs.textContent = String(state.subscriptions.length);
    statDue.textContent = String(due);
    statPaid.textContent = String(paid);
  }

  function contactRow(sub, contact, monthKey) {
    const amount = shareAmount(sub);
    const amountText = formatMoney(amount, sub.currency);
    const message = renderTemplate(sub.template, {
      name: contact.name,
      amount: amountText,
      service: sub.name,
      month: monthKey
    });

    const row = document.createElement("div");
    row.className = "contact-row";

    const top = document.createElement("div");
    top.className = "contact-main";
    const idWrap = document.createElement("div");
    const nameEl = document.createElement("div");
    nameEl.className = "contact-id";
    nameEl.textContent = contact.name;
    const phoneEl = document.createElement("div");
    phoneEl.className = "contact-phone";
    phoneEl.textContent = `+${digitsOnly(contact.phone)} · ${amountText}`;
    idWrap.append(nameEl, phoneEl);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "icon-btn";
    removeBtn.setAttribute("aria-label", `${t("removeOf")} ${contact.name}`);
    removeBtn.innerHTML = TRASH_SVG;
    removeBtn.addEventListener("click", () => {
      sub.contacts = sub.contacts.filter((x) => x.id !== contact.id);
      saveState(state);
      render();
    });
    top.append(idWrap, removeBtn);

    const preview = document.createElement("p");
    preview.className = "msg-preview";
    preview.textContent = message;

    const controls = document.createElement("div");
    controls.className = "contact-controls";

    const wa = document.createElement("a");
    wa.className = "wa-btn";
    wa.href = waLink(contact.phone, message);
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.innerHTML = `${WA_SVG}<span>WhatsApp</span>`;

    const paidLabel = document.createElement("label");
    paidLabel.className = "paid-check" + (isPaid(state, sub.id, monthKey, contact.id) ? " paid" : "");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = isPaid(state, sub.id, monthKey, contact.id);
    box.setAttribute("aria-label", `${t("markPaidOf")} ${contact.name} ${t("markPaidSuffix")} ${monthKey}`);
    box.addEventListener("change", () => {
      setPaid(state, sub.id, monthKey, contact.id, box.checked);
      saveState(state);
      refreshStats();
      paidLabel.classList.toggle("paid", box.checked);
    });
    const paidText = document.createElement("span");
    paidText.textContent = t("paid");
    paidLabel.append(box, paidText);

    controls.append(wa, paidLabel);
    row.append(top, preview, controls);
    return row;
  }

  function render() {
    const monthKey = monthPicker.value || currentMonthKey();
    subList.innerHTML = "";
    if (state.subscriptions.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = t("noSubs");
      subList.append(empty);
    }
    for (const sub of state.subscriptions) {
      const card = document.createElement("article");
      card.className = "sub";

      const head = document.createElement("div");
      head.className = "sub-head";
      const titleRow = document.createElement("div");
      titleRow.className = "sub-title-row";
      const title = document.createElement("h3");
      title.textContent = sub.name;
      const perPerson = document.createElement("strong");
      perPerson.textContent = `${formatMoney(shareAmount(sub), sub.currency)} ${t("each")}`;
      titleRow.append(title, perPerson);

      const meta = document.createElement("p");
      meta.className = "sub-meta";
      const paidCount = sub.contacts.filter((c) => isPaid(state, sub.id, monthKey, c.id)).length;
      meta.textContent = `${t("total")} ${formatMoney(sub.totalMonthly, sub.currency)} · ${t("day")} ${sub.dayOfMonth} · ${paidCount}/${sub.contacts.length} ${t("paidIn")} ${monthKey}`;

      const actions = document.createElement("div");
      actions.className = "sub-actions";
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "btn-small";
      addBtn.textContent = t("addContact");
      addBtn.addEventListener("click", () => {
        activeSubIdForContact = sub.id;
        document.getElementById("contactForm").reset();
        document.getElementById("contactDialog").showModal();
      });
      const editBtn = document.createElement("button");
      editBtn.type = "button";
      editBtn.className = "btn-small";
      editBtn.textContent = t("edit");
      editBtn.addEventListener("click", () => {
        editingSubId = sub.id;
        document.getElementById("fName").value = sub.name;
        document.getElementById("fTotal").value = String(sub.totalMonthly);
        document.getElementById("fCurrency").value = sub.currency;
        document.getElementById("fDay").value = String(sub.dayOfMonth);
        document.getElementById("fTemplate").value = sub.template;
        document.getElementById("subDialog").showModal();
      });
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-small";
      delBtn.textContent = t("delete");
      delBtn.addEventListener("click", () => {
        state.subscriptions = state.subscriptions.filter((x) => x.id !== sub.id);
        saveState(state);
        render();
      });
      actions.append(addBtn, editBtn, delBtn);
      head.append(titleRow, meta, actions);
      card.append(head);

      for (const contact of sub.contacts) card.append(contactRow(sub, contact, monthKey));
      subList.append(card);
    }
    refreshStats();
  }

  document.getElementById("langBtn").addEventListener("click", () => {
    const next = getLang() === "es" ? "en" : "es";
    try { localStorage.setItem(LANG_KEY, next); } catch { /* ignore */ }
    applyI18n();
    render();
  });

  document.getElementById("addSubBtn").addEventListener("click", () => {
    editingSubId = null;
    document.getElementById("subForm").reset();
    document.getElementById("fCurrency").value = "EUR";
    document.getElementById("fDay").value = "1";
    document.getElementById("fTemplate").value = defaultTemplate();
    document.getElementById("subDialog").showModal();
  });

  document.getElementById("subForm").addEventListener("submit", (e) => {
    if (e.submitter && e.submitter.value === "cancel") return;
    const name = document.getElementById("fName").value.trim();
    const total = Number(document.getElementById("fTotal").value);
    const currency = document.getElementById("fCurrency").value.trim() || "EUR";
    const day = Number(document.getElementById("fDay").value) || 1;
    const template = document.getElementById("fTemplate").value.trim() || defaultTemplate();
    if (!name) return;
    if (editingSubId) {
      const sub = state.subscriptions.find((x) => x.id === editingSubId);
      if (sub) Object.assign(sub, { name, totalMonthly: total, currency, dayOfMonth: day, template });
    } else {
      state.subscriptions.push({ id: uid("sub"), name, totalMonthly: total, currency, dayOfMonth: day, template, contacts: [] });
    }
    saveState(state);
    render();
  });

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    if (e.submitter && e.submitter.value === "cancel") return;
    const name = document.getElementById("cName").value.trim();
    const phone = document.getElementById("cPhone").value.trim();
    if (!name || !phone) return;
    const sub = state.subscriptions.find((x) => x.id === activeSubIdForContact);
    if (!sub) return;
    sub.contacts.push({ id: uid("c"), name, phone });
    saveState(state);
    render();
  });

  monthPicker.addEventListener("change", render);

  document.getElementById("exportBtn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `shared-subs-${monthPicker.value || "backup"}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });

  document.getElementById("importFile").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed.subscriptions) throw new Error("invalid");
        state = parsed;
        if (!state.paid) state.paid = {};
        saveState(state);
        render();
      } catch {
        alert(t("invalidBackup"));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  render();
}

document.addEventListener("DOMContentLoaded", main);
