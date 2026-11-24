interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  variant?: "default" | "security";
  action?: React.ReactNode;
  columns?: 3 | 4 | 6 | 8 | 12;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  variant = "default",
  action,
  columns = 12,
}) => {
  if (variant === "security") {
    return (
      <section data-columns={columns} className={`sec-panel ${className}`}>
        <div className="sec-panel-header">
          <div>
            <h2>{title}</h2>
            {desc && <p>{desc}</p>}
          </div>
          {action}
        </div>
        <div className="sec-panel-body">{children}</div>
      </section>
    );
  }
  return (
    <div data-columns={columns} className={`em-card ${className}`}>
      {/* Card Header */}
      <div className="em-card-header">
        <h2 className="em-card-title">{title}</h2>
        {desc && <p className="em-description">{desc}</p>}
      </div>

      {/* Card Body */}
      <div className="em-card-content">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
