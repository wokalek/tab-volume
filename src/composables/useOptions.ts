export default function () {
  const options = useAtom($options)

  const optionsRef = ref(_.cloneDeep(options.value))

  watch(options, () => optionsRef.value = _.cloneDeep(options.value))

  return optionsRef
}
