import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "3 oranges",
    bought: false,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState(data);

  function handleIsFormOpen() {
    setShowForm((prev) => !prev);
  }

  function handleItems(itemList) {
    setItems((item) => itemList);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure that you want to delete selected item?")) {
      setItems((items) => items.filter((item) => item.id !== id));
    }
  }

  function handleBought(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  function handleEdit(id) {}

  return (
    <div className="app">
      <Header showForm={showForm} onIsOpen={handleIsFormOpen} />
      <PopulateList showForm={showForm} items={items} onAddItem={handleItems} />
      <List items={items} onDelete={handleDelete} onBought={handleBought} />
      <Footer items={items} />
    </div>
  );
}

function Header({ showForm, onIsOpen }) {
  return (
    <header>
      <div>
        <h1 className="title">Shopping list</h1>
      </div>
      <button onClick={onIsOpen}>{showForm ? <BiMinus /> : <BiPlus />}</button>
    </header>
  );
}

function PopulateList({ showForm, items, onAddItem }) {
  const [form, setForm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { id: crypto.randomUUID(), name: form, bought: false };
    const newItemsList = [...items, newItem];
    onAddItem(newItemsList);
    setForm("");
  }

  return (
    <>
      {showForm && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add item"
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
          <button type="submit">
            <BiPlus />
          </button>
        </form>
      )}
    </>
  );
}

function List({ items, onDelete, onBought }) {
  return (
    <div className="list">
      {items.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            onDelete={onDelete}
            onBought={onBought}
          />
        );
      })}
    </div>
  );
}

function Item({ item, onDelete, onBought }) {
  return (
    <div className="item">
      <div className="item-left">
        <input
          type="checkbox"
          name={item.name}
          onChange={() => onBought(item.id)}
        />
        <label className={item.bought ? "bought" : ""} htmlFor={item.name}>
          {item.name}
        </label>
      </div>
      <div className="item-right">
        <BsTrash onClick={() => onDelete(item.id)} />
      </div>
    </div>
  );
}

function Footer({ items }) {
  const boughtItems = items.filter((item) => item.bought);
  const percentage = (boughtItems.length * 100) / items.length;

  return (
    <footer>
      <p>
        <em>
          You have {items.length} items on your list, and you bought{" "}
          {boughtItems.length} (
          {boughtItems.length > 0 ? percentage.toFixed(0) : 0}%)
        </em>
      </p>
    </footer>
  );
}

export default App;
