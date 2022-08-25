import * as React from "react";
import "./styles.css";

interface IProps {
  open?: boolean;
  header: string | React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  iconButtonClassName?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  collapsibleClassName?: string;
  children?: React.ReactNode;
}

export function Collapsible(props: IProps) {
  const {
    open,
    collapsibleClassName = "collapsible-card-edonec",
    headerClassName = "collapsible-header-edonec",
    titleClassName = "title-text-edonec",
    iconButtonClassName = "collapsible-icon-button-edonec",
    contentClassName = "collapsible-content-edonec",
    contentContainerClassName = "collapsible-content-padding-edonec",
    children,
    header,
  } = props;

  const [isOpen, setIsOpen] = React.useState(open);
  const [height, setHeight] = React.useState<number | undefined>(
    open ? undefined : 0
  );
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(
    function updateContentHeight() {
      if (!height || !isOpen || !ref.current) return;

      const resizeObserver = new ResizeObserver(function(el) {
        setHeight(el[0].contentRect.height);
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    },
    [height, isOpen]
  );

  function onClick() {
    setIsOpen(!isOpen);
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
    else setHeight(0);
  }

  return (
    <div>
      <div className={collapsibleClassName}>
        <div>
          <div className={headerClassName}>
            <div className={titleClassName}>{header}</div>
            <button
              type="button"
              className={iconButtonClassName}
              onClick={onClick}
            >
              <i
                className={`fas-edonec fa-chevron-down-edonec ${
                  isOpen
                    ? "rotate-center-edonec down"
                    : "rotate-center-edonec up"
                }`}
              />
            </button>
          </div>
        </div>
        <div className={contentClassName} style={{ height }}>
          <div ref={ref}>
            <div className={contentContainerClassName}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
