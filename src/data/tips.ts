const extensionLink = useExtensionLink()

export const tips: Tip[] = [
  { content: tw`
    <p>Введите <strong>chrome://extensions/shortcuts</strong> в&nbsp;адресную строку и&nbsp;настройте свои комбинации клавиш для изменения громкости вкладки</p>
  ` },
  { content: tw`
    <p>Используйте колёсико мышки в&nbsp;окне расширения, чтобы менять громкость</p>
  ` },
  { content: tw`
    <p>Используя колёсико мышки в&nbsp;окне расширения, зажмите <kbd>Ctrl</kbd>, чтобы изменять громкость на&nbsp;1%</p>
  ` },
  { content: tw`
    <p><a href="${extensionLink}/reviews" target="_blank">Поделитесь</a> своим мнением о&nbsp;расширении!</p>
  ` },
]

export const tipSupport: Tip = {
  content: tw`
    <p>Спасибо за&nbsp;использование!&nbsp;❤️</p>
    <p>
      Вы&nbsp;можете поддержать автора на&nbsp;<a href="https://boosty.to/wokalek/donate" target="_blank">Boosty</a>
    </p>`,
}
