export const templateOptions = [
  { id: 'vue3', label: 'vue3-template' },
  { id: 'vue3-lite', label: 'vue3-lite-template  (without router and store)' },
  { id: 'ts-lite', label: 'ts-lite-template' },
  // { id: 'REACT', label: 'react-template' },
  // { id: 'REACT_LITE', label: 'react-lite-template' },
]

const optionsToChoices = () => templateOptions.map(o => ({ title: o.label, value: o.id }))

export const templateChoices = optionsToChoices()
