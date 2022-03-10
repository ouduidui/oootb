const templateOptions = [
  // { id: 'NODE', label: 'node-ts-template' },
  // { id: 'VUE3', label: 'vue3-template' },
  { id: 'vue3-lite', label: 'vue3-lite-template  (without router and store)' },
  // { id: 'REACT', label: 'react-template' },
  // { id: 'REACT_LITE', label: 'react-lite-template' },
]

const optionsToChoices = () =>
  templateOptions.map((o) => ({ title: o.label, value: o.id }))

module.exports = {
  templateOptions,
  templateChoices: optionsToChoices(),
}
