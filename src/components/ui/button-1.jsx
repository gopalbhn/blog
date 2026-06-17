
const GradientButton = ({
  children,
  width = '90px',
  height = '40px',
  className = '',
  onClick,
  disabled = false,
  ...props
}) => {
  const commonGradientStyles = `
    relative rounded-[50px] cursor-pointer hover:after:opacity-100
    after:content-[""] after:block after:absolute after:bg-[var(--color-primary)]
    after:inset-[5px] after:rounded-[45px] after:z-[1]
    after:transition-opacity after:duration-300 after:ease-linear
    flex items-center justify-center
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className="text-[#eee] text-center">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`
          ${commonGradientStyles}
          rotatingGradient
          ${className}
        `}
        style={{
          '--r': '0deg',
          width: width,
          height: height
        }}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        {...props}>
        <span
          className="relative z-10 text-white flex items-center justify-center label font-bold">
          {children}
        </span>
      </div>
    </div>
  );
};

export default GradientButton;
