import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Collapse, Modal, Input, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { randomString, deepClone } from "../utils/util";
import "../style/todo.scss";

const { Panel } = Collapse;

// todo页面
const TodoPage = function () {
  const [btnType, setBtnType] = useState("normal");
  const isNormal = useMemo(() => {
    return btnType === "normal";
  }, [btnType]);

  return (
    <div className='todo-page'>
      <Button
        style={{ marginRight: "20px" }}
        type={isNormal && "primary"}
        onClick={() => setBtnType("normal")}
      >
        普通模式
      </Button>

      <Button
        type={!isNormal && "primary"}
        onClick={() => setBtnType("markdown")}
      >
        markdown模式
      </Button>

      {isNormal ? <NormalInput /> : <MarkdownInput />}
    </div>
  );
};

// normal 模式新增弹窗
function AddItemModal(props, ref) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemInput, setItemInput] = useState({
    title: "",
    dateRange: "",
    desc: "",
  });
  function showModal(data) {
    setIsModalVisible(true);
    setItemInput(data);
  }
  function closeModal() {
    setIsModalVisible(false);
  }
  useImperativeHandle(ref, () => ({
    showModal,
    closeModal,
  }));
  return (
    <Modal
      title='添加'
      visible={isModalVisible}
      onOk={() => {
        props.onOkaddItem(itemInput);
      }}
      onCancel={() => setIsModalVisible(false)}
    >
      <Input
        placeholder='标题'
        value={itemInput.title}
        onInput={(event) =>
          setItemInput({ ...itemInput, title: event.target.value })
        }
      ></Input>
      <Input
        style={{ marginTop: "20px" }}
        placeholder='时间段'
        value={itemInput.dateRange}
        onInput={(event) =>
          setItemInput({ ...itemInput, dateRange: event.target.value })
        }
      ></Input>
      <Input.TextArea
        style={{ marginTop: "20px" }}
        placeholder='总结'
        value={itemInput.desc}
        onInput={(event) =>
          setItemInput({ ...itemInput, desc: event.target.value })
        }
      ></Input.TextArea>
    </Modal>
  );
}
AddItemModal = forwardRef(AddItemModal);

// normal模式页面
function NormalInput() {
  const [normalInput, setNormalInput] = useState([]);
  const modalRef = useRef(null);

  function onAdd(data) {
    modalRef.current?.showModal({
      title: "",
      dateRange: "",
      desc: "",
      ...data,
    });
  }
  function onOkaddItem(data) {
    if (!data.id) {
      data.id = randomString();
      setNormalInput([...normalInput, data]);
    } else {
      const copyData = deepClone(normalInput);
      const index = copyData.findIndex((item) => item.id === data.id);
      copyData[index] = { ...copyData[index], ...data };
      setNormalInput(copyData);
    }
    console.log(data, normalInput);
    modalRef.current.closeModal();
  }
  function onSubmit() {}
  return (
    <div className='normal-input-container'>
      <Row justify='end'>
        <Col>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => onAdd()}
          >
            添加
          </Button>
        </Col>
      </Row>
      <div style={{ margin: "10px 0" }}>
        <Collapse defaultActiveKey={[0]}>
          {normalInput.map((item, index) => (
            <Panel header={`${index + 1}、${item.title}`} key={index}>
              <Row justify='start'>
                <Col><span>时间段：</span></Col>
                <Col><p>{item.dateRange}</p></Col>
              </Row>

              <Row justify='start'>
                <Col><span>总结：</span></Col>
                <Col><pre>{item.desc}</pre></Col>
              </Row>

              <Row justify='end'>
                <Col>
                  <Button
                    style={{ marginTop: "4px" }}
                    type='primary'
                    onClick={() => onAdd(item)}
                  >
                    编辑
                  </Button>
                </Col>
              </Row>
            </Panel>
          ))}
        </Collapse>
      </div>
      <Row justify='end'>
        <Col>
          <Button
            style={{ marginTop: "20px" }}
            type='primary'
            onClick={() => onSubmit()}
          >
            自动填充到todo
          </Button>
        </Col>
      </Row>

      <AddItemModal ref={modalRef} onOkaddItem={onOkaddItem}></AddItemModal>
    </div>
  );
}

// markdown模式页面
function MarkdownInput() {
  const [markdownInput, setMarkdownInput] = useState("");
  const editor = useEditor({
    extensions: [StarterKit],
    content: markdownInput,
    autofocus: true,
  });
  function onSubmit() {}

  return (
    <div>
      <EditorContent style={{ marginTop: "20px" }} editor={editor} />
      <Row justify='end'>
        <Col>
          <Button
            style={{ marginTop: "20px" }}
            type='primary'
            onClick={() => onSubmit()}
          >
            自动填充到todo
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default TodoPage;
