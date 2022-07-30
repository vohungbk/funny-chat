import dayjs from 'dayjs'

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const formatter = dayjs(date)
  const now = new Date()

  if (dayjs().isSame(formatter, 'date')) return formatter.format('h:mm A')

  if (dayjs().isSame(formatter, 'week')) return formatter.format('ddd h:mm A')

  if (now.getFullYear() === date.getFullYear())
    return formatter.format('MMM DD h:mm A')

  return formatter.format('DD MMM YYYY h:mm A')
}

export const generateKeywords = (displayName: string) => {
  const name = displayName.split(' ').filter((word) => word)

  const length = name.length
  const flagArray: boolean[] = []
  const result: string[] = []
  const stringArray: string[] = []

  for (let i = 0; i < length; i++) {
    flagArray[i] = false
  }

  const createKeywords = (name: string) => {
    const arrName: string[] = []
    let curName = ''
    name.split('').forEach((letter) => {
      curName += letter
      arrName.push(curName)
    })
    return arrName
  }

  function findPermutation(k: number) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true
        result[k] = name[i]

        if (k === length - 1) {
          stringArray.push(result.join(' '))
        }

        findPermutation(k + 1)
        flagArray[i] = false
      }
    }
  }

  findPermutation(0)

  const keywords = stringArray.reduce((acc: string[], cur) => {
    const words = createKeywords(cur)
    return [...acc, ...words]
  }, [])

  return keywords
}
