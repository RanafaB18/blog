import { Quill } from "react-quill";

const CustomToolbar = () => {
  // Add sizes to whitelist and register them
  const Size = Quill.import("formats/size");
  Size.whitelist = ["medium", "large", "huge"];
  Quill.register(Size, true);

  // Add fonts to whitelist and register them
  const Font = Quill.import("formats/font");
  Font.whitelist = ["sans", "monospace", "serif"];
  Quill.register(Font, true);
  return (
    <div className="flex md:flex-wrap relative z-10 md:min-h-[3.25rem]">
      <div className="flex h-13 md:overflow-visible items-center">
        <div id="toolbar" className="h-13">
          <span className="ql-formats">
            <select className="ql-font !m-0 !p-0" defaultValue="arial">
              <option value="arial">Sans</option>
              <option value="monospace">Monospace</option>
              <option value="serif">Serif</option>
            </select>
            <select className="ql-size" defaultValue="medium">
              <option value="medium">Normal</option>
              <option value="large">Large</option>
              <option value="huge">Huge</option>
            </select>
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>
          <span className="ql-formats">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-script" value="super" />
            <button className="ql-script" value="sub" />
            <button className="ql-blockquote" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <select className="ql-align" />
            <select className="ql-color" />
            <select className="ql-background" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            <button className="ql-video" />
          </span>
          <span className="border border-white border-opacity-30 h-full"></span>

          <span className="ql-formats">
            <button className="ql-formula" />
            <button className="ql-code-block p-3 w-10 h-10" />
            <button className="ql-clean" />
          </span>
        </div>
      </div>
    </div>
  );
};
export default CustomToolbar;
