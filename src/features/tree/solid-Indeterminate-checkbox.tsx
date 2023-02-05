import { createEffect, JSX } from "solid-js";

function IndeterminateCheckbox(
  props: {
    indeterminate?: boolean;
    checked?: boolean;
    disabled?: boolean;
  } & JSX.DOMAttributes<HTMLInputElement>
) {
  let ref: HTMLInputElement | undefined;
  createEffect(() => {
    if (ref && typeof props.indeterminate === "boolean") {
      ref.indeterminate = !props.checked && props.indeterminate;
    }
  });

  return <input ref={ref} type="checkbox" class="checkbox" {...props} />;
}

export default IndeterminateCheckbox;
