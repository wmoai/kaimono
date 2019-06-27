import { Identifier } from './Entity';
import ShoppingList from './ShoppingList';

const kBrowseHistory = 'kBrowseHistory';

export default interface BrowseHistory {
  id: Identifier<ShoppingList>;
  title: string;
}

interface BrowseHistoryData {
  id: string;
  title: string;
}

function getData(): BrowseHistoryData[] {
  return JSON.parse(localStorage.getItem(kBrowseHistory) || '[]');
}

export function get(): BrowseHistory[] {
  return getData().map((data: BrowseHistoryData) => ({
    id: new Identifier<ShoppingList>(data.id),
    title: data.title
  }));
}

export function set(id: Identifier<ShoppingList>, title: string) {
  if (!id || !title) {
    return;
  }
  const history = getData();
  const newEntry: BrowseHistoryData = { id: id.toString(), title };
  const newHistory: BrowseHistoryData[] = [newEntry].concat(
    history.filter(entry => entry.id !== id.toString())
  );
  const maxNum = 20;
  const reduceCount = newHistory.length - maxNum;
  if (reduceCount > 0) {
    newHistory.splice(-reduceCount, reduceCount);
  }
  localStorage.setItem(kBrowseHistory, JSON.stringify(newHistory));
}
