export const createProps = (layout) => {
  var dya = layout.DYA;
  var allProps = {
    // Padding
    paddingGroup:
      dya.paddingGroup && dya.paddingGroup != null && dya.paddingGroup != ""
        ? parseFloat(dya.paddingGroup)
        : 0.2,
    paddingBars:
      dya.paddingBars && dya.paddingBars != null && dya.paddingBars != ""
        ? parseFloat(dya.paddingBars)
        : 0.05,
    // Legend
    legendSwitch:
      dya.legendSwitch && dya.legendSwitch != null && dya.legendSwitch != ""
        ? dya.legendSwitch
        : false,
  };
  return allProps;
};
