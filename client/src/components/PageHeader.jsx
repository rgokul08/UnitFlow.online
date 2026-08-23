/** UnitFlow style: page headings carry the bracket-and-transfer mark into every measurement workspace. */
export function PageHeader({ eyebrow, title, description, action }) {
  return <><div className="calibration-strip" aria-hidden="true"><img src="/unitflow-mark.svg" alt="" /><span>00</span><i /><i /><i /><b>UNITFLOW / LOCAL WORKBENCH</b><i /><i /><i /><span>100</span></div><header className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action && <div className="page-header-action">{action}</div>}</header></>;
}
