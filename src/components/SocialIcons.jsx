const ICONS = {
  instagram: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  ),
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 8.5h2V5.4c-.35-.05-1.5-.15-2.86-.15-2.83 0-4.77 1.78-4.77 5.05V13H5.6v3.5h2.77V22h3.6v-5.5h2.75l.44-3.5h-3.19v-2.4c0-1 .28-1.68 1.73-1.68Z"
        fill="currentColor"
      />
    </svg>
  ),
  twitter: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 5.9c-.66.3-1.36.5-2.1.6a3.7 3.7 0 0 0 1.6-2 7.3 7.3 0 0 1-2.33.9 3.66 3.66 0 0 0-6.24 3.34A10.4 10.4 0 0 1 4.3 4.9a3.66 3.66 0 0 0 1.13 4.9 3.6 3.6 0 0 1-1.66-.46v.05a3.67 3.67 0 0 0 2.94 3.6 3.7 3.7 0 0 1-1.65.06 3.67 3.67 0 0 0 3.42 2.55A7.35 7.35 0 0 1 3 16.9a10.37 10.37 0 0 0 5.63 1.65c6.75 0 10.44-5.6 10.44-10.45l-.01-.48A7.4 7.4 0 0 0 21 5.9Z"
        fill="currentColor"
      />
    </svg>
  ),
}

const SocialIcons = ({ items = ['instagram', 'facebook', 'twitter'], className = '' }) => (
  <div className={`social-icons ${className}`}>
    {items.map((item) => (
      <a key={item} href="#" className="social-icons-btn" aria-label={item}>
        {ICONS[item]}
      </a>
    ))}
  </div>
)

export default SocialIcons
