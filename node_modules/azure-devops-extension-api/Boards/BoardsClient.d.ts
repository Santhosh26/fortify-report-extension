import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import Boards = require("../Boards/Boards");
export declare class BoardsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Add a new board for the project.
     *
     * @param postedBoard - Board definition.
     * @param project - Project ID or project name
     */
    createBoard(postedBoard: Boards.CreateBoard, project: string): Promise<Boards.BoardResponse>;
    /**
     * Deletes a board.
     *
     * @param project - Project ID or project name
     * @param id - Board identifier.
     */
    deleteBoard(project: string, id: number): Promise<void>;
    /**
     * Returns information for a board given its unique identifier.
     *
     * @param project - Project ID or project name
     * @param id - Board's unique identifier.
     */
    getBoard(project: string, id: number): Promise<Boards.BoardResponse>;
    /**
     * Get boards.
     *
     * @param project - Project ID or project name
     * @param top - The maximum number of boards to get.
     * @param skip - The number of boards to skip.
     */
    getBoards(project: string, top?: number, skip?: number): Promise<Boards.BoardReference[]>;
    /**
     * Updates a board.
     *
     * @param updatedBoard - New board data.
     * @param project - Project ID or project name
     * @param id - Id of the board to update.
     * @param eTag - Board Latest Changed Date
     */
    updateBoard(updatedBoard: Boards.UpdateBoard, project: string, id: number, eTag: String): Promise<Boards.BoardResponse>;
    /**
     * Creates a new column on a board.
     *
     * @param boardColumn - Column data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    createBoardColumn(boardColumn: Boards.BoardColumnCreate, project: string, board: number): Promise<Boards.BoardColumnResponse>;
    /**
     * Deletes a column from a board.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Column identifier.
     * @param forceRemoveItems - Boolean indicating if items are to be force removed during the column delete.
     */
    deleteBoardColumn(project: string, board: number, id: string, forceRemoveItems: boolean): Promise<void>;
    /**
     * Gets column data for a board given its identifier.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Column identifier.
     */
    getBoardColumn(project: string, board: number, id: string): Promise<Boards.BoardColumnResponse>;
    /**
     * Get columns in a board.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    getBoardColumns(project: string, board: number): Promise<Boards.BoardColumnCollectionResponse>;
    /**
     * Updates a board column.
     *
     * @param boardColumn - Column data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Column identifier.
     * @param eTag - Column Latest Changed Date
     */
    updateBoardColumn(boardColumn: Boards.BoardColumnUpdate, project: string, board: number, id: string, eTag: String): Promise<Boards.BoardColumnResponse>;
    /**
     * Adds a single item to a board.
     *
     * @param item - Item to add to the board.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    addBoardItem(item: Boards.NewBoardItem, project: string, board: number): Promise<Boards.BoardItemResponse>;
    /**
     * Gets data for a single board's item.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Item identifier.
     */
    getBoardItem(project: string, board: number, id: string): Promise<Boards.BoardItemResponse>;
    /**
     * Get items information for a board given its identifier.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    getBoardItems(project: string, board: number): Promise<Boards.BoardItemCollectionResponse>;
    /**
     * Removes an item from a board.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Board Item identifier to remove.
     */
    removeBoardItem(project: string, board: number, id: string): Promise<void>;
    /**
     * Updates a single item in a board.
     *
     * @param updateItemDef - Updated item data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Update item id.
     * @param eTag - Item Latest Changed Date
     */
    updateBoardItem(updateItemDef: Boards.UpdateBoardItem, project: string, board: number, id: string, eTag: String): Promise<Boards.BoardItemResponse>;
    /**
     * Do an operation on a batch of items.
     *
     * @param batchRequest - Data defining the batch operation.
     * @param project - Project ID or project name
     * @param board - The id of the board containing the items.
     */
    updateBoardItems(batchRequest: Boards.BoardItemBatchOperation, project: string, board: number): Promise<Boards.BoardItemCollectionResponse>;
    /**
     * Creates a new row on a board.
     *
     * @param boardRow - Row data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    createBoardRow(boardRow: Boards.BoardRowCreate, project: string, board: number): Promise<Boards.BoardRowResponse>;
    /**
     * Deletes a row from a board.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Row identifier.
     * @param forceRemoveItems - Boolean indicating if items are to be force removed during the row delete.
     */
    deleteBoardRow(project: string, board: number, id: string, forceRemoveItems: boolean): Promise<void>;
    /**
     * Gets a row given its identifier and board.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Board row identifier.
     */
    getBoardRow(project: string, board: number, id: string): Promise<Boards.BoardRowResponse>;
    /**
     * Get rows in a board given its identifier.
     *
     * @param project - Project ID or project name
     * @param board - Board identifier.
     */
    getBoardRows(project: string, board: number): Promise<Boards.BoardRowCollectionResponse>;
    /**
     * Updates a board row.
     *
     * @param boardRow - Row data.
     * @param project - Project ID or project name
     * @param board - Board identifier.
     * @param id - Row identifier.
     * @param eTag - Row Latest Changed Date
     */
    updateBoardRow(boardRow: Boards.BoardRowUpdate, project: string, board: number, id: string, eTag: String): Promise<Boards.BoardRowResponse>;
    /**
     * Creates a new sync for a column on a board.
     *
     * @param boardSync -
     * @param project - Project ID or project name
     * @param board -
     * @param column -
     */
    createBoardSyncAction(boardSync: Boards.BoardItemStateSyncCreate, project: string, board: number, column: string): Promise<Boards.BoardItemStateSync>;
}
