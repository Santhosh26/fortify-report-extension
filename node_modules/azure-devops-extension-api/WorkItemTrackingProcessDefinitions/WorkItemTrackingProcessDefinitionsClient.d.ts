import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as WorkItemTrackingProcessDefinitions from "../WorkItemTrackingProcessDefinitions/WorkItemTrackingProcessDefinitions";
export declare class WorkItemTrackingProcessDefinitionsRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Creates a single behavior in the given process.
     *
     * @param behavior -
     * @param processId - The ID of the process
     */
    createBehavior(behavior: WorkItemTrackingProcessDefinitions.BehaviorCreateModel, processId: string): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel>;
    /**
     * Removes a behavior in the process.
     *
     * @param processId - The ID of the process
     * @param behaviorId - The ID of the behavior
     */
    deleteBehavior(processId: string, behaviorId: string): Promise<void>;
    /**
     * Returns a single behavior in the process.
     *
     * @param processId - The ID of the process
     * @param behaviorId - The ID of the behavior
     */
    getBehavior(processId: string, behaviorId: string): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel>;
    /**
     * Returns a list of all behaviors in the process.
     *
     * @param processId - The ID of the process
     */
    getBehaviors(processId: string): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel[]>;
    /**
     * Replaces a behavior in the process.
     *
     * @param behaviorData -
     * @param processId - The ID of the process
     * @param behaviorId - The ID of the behavior
     */
    replaceBehavior(behaviorData: WorkItemTrackingProcessDefinitions.BehaviorReplaceModel, processId: string, behaviorId: string): Promise<WorkItemTrackingProcessDefinitions.BehaviorModel>;
    /**
     * Creates a control in a group
     *
     * @param control - The control
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group to add the control to
     */
    addControlToGroup(control: WorkItemTrackingProcessDefinitions.Control, processId: string, witRefName: string, groupId: string): Promise<WorkItemTrackingProcessDefinitions.Control>;
    /**
     * Updates a control on the work item form
     *
     * @param control - The updated control
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group
     * @param controlId - The ID of the control
     */
    editControl(control: WorkItemTrackingProcessDefinitions.Control, processId: string, witRefName: string, groupId: string, controlId: string): Promise<WorkItemTrackingProcessDefinitions.Control>;
    /**
     * Removes a control from the work item form
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group
     * @param controlId - The ID of the control to remove
     */
    removeControlFromGroup(processId: string, witRefName: string, groupId: string, controlId: string): Promise<void>;
    /**
     * Moves a control to a new group
     *
     * @param control - The control
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param groupId - The ID of the group to move the control to
     * @param controlId - The id of the control
     * @param removeFromGroupId - The group to remove the control from
     */
    setControlInGroup(control: WorkItemTrackingProcessDefinitions.Control, processId: string, witRefName: string, groupId: string, controlId: string, removeFromGroupId?: string): Promise<WorkItemTrackingProcessDefinitions.Control>;
    /**
     * Creates a single field in the process.
     *
     * @param field -
     * @param processId - The ID of the process
     */
    createField(field: WorkItemTrackingProcessDefinitions.FieldModel, processId: string): Promise<WorkItemTrackingProcessDefinitions.FieldModel>;
    /**
     * Updates a given field in the process.
     *
     * @param field -
     * @param processId - The ID of the process
     */
    updateField(field: WorkItemTrackingProcessDefinitions.FieldUpdate, processId: string): Promise<WorkItemTrackingProcessDefinitions.FieldModel>;
    /**
     * Adds a group to the work item form
     *
     * @param group - The group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page to add the group to
     * @param sectionId - The ID of the section to add the group to
     */
    addGroup(group: WorkItemTrackingProcessDefinitions.Group, processId: string, witRefName: string, pageId: string, sectionId: string): Promise<WorkItemTrackingProcessDefinitions.Group>;
    /**
     * Updates a group in the work item form
     *
     * @param group - The updated group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section the group is in
     * @param groupId - The ID of the group
     */
    editGroup(group: WorkItemTrackingProcessDefinitions.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): Promise<WorkItemTrackingProcessDefinitions.Group>;
    /**
     * Removes a group from the work item form
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section to the group is in
     * @param groupId - The ID of the group
     */
    removeGroup(processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): Promise<void>;
    /**
     * Moves a group to a different page and section
     *
     * @param group - The updated group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section the group is in
     * @param groupId - The ID of the group
     * @param removeFromPageId - ID of the page to remove the group from
     * @param removeFromSectionId - ID of the section to remove the group from
     */
    setGroupInPage(group: WorkItemTrackingProcessDefinitions.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string, removeFromPageId: string, removeFromSectionId: string): Promise<WorkItemTrackingProcessDefinitions.Group>;
    /**
     * Moves a group to a different section
     *
     * @param group - The updated group
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section the group is in
     * @param groupId - The ID of the group
     * @param removeFromSectionId - ID of the section to remove the group from
     */
    setGroupInSection(group: WorkItemTrackingProcessDefinitions.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string, removeFromSectionId: string): Promise<WorkItemTrackingProcessDefinitions.Group>;
    /**
     * Gets the form layout
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    getFormLayout(processId: string, witRefName: string): Promise<WorkItemTrackingProcessDefinitions.FormLayout>;
    /**
     * Returns meta data of the picklist.
     *
     */
    getListsMetadata(): Promise<WorkItemTrackingProcessDefinitions.PickListMetadataModel[]>;
    /**
     * Creates a picklist.
     *
     * @param picklist -
     */
    createList(picklist: WorkItemTrackingProcessDefinitions.PickListModel): Promise<WorkItemTrackingProcessDefinitions.PickListModel>;
    /**
     * Removes a picklist.
     *
     * @param listId - The ID of the list
     */
    deleteList(listId: string): Promise<void>;
    /**
     * Returns a picklist.
     *
     * @param listId - The ID of the list
     */
    getList(listId: string): Promise<WorkItemTrackingProcessDefinitions.PickListModel>;
    /**
     * Updates a list.
     *
     * @param picklist -
     * @param listId - The ID of the list
     */
    updateList(picklist: WorkItemTrackingProcessDefinitions.PickListModel, listId: string): Promise<WorkItemTrackingProcessDefinitions.PickListModel>;
    /**
     * Adds a page to the work item form
     *
     * @param page - The page
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    addPage(page: WorkItemTrackingProcessDefinitions.Page, processId: string, witRefName: string): Promise<WorkItemTrackingProcessDefinitions.Page>;
    /**
     * Updates a page on the work item form
     *
     * @param page - The page
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    editPage(page: WorkItemTrackingProcessDefinitions.Page, processId: string, witRefName: string): Promise<WorkItemTrackingProcessDefinitions.Page>;
    /**
     * Removes a page from the work item form
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page
     */
    removePage(processId: string, witRefName: string, pageId: string): Promise<void>;
    /**
     * Creates a state definition in the work item type of the process.
     *
     * @param stateModel -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    createStateDefinition(stateModel: WorkItemTrackingProcessDefinitions.WorkItemStateInputModel, processId: string, witRefName: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>;
    /**
     * Removes a state definition in the work item type of the process.
     *
     * @param processId - ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - ID of the state
     */
    deleteStateDefinition(processId: string, witRefName: string, stateId: string): Promise<void>;
    /**
     * Returns a state definition in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    getStateDefinition(processId: string, witRefName: string, stateId: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>;
    /**
     * Returns a list of all state definitions in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    getStateDefinitions(processId: string, witRefName: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel[]>;
    /**
     * Hides a state definition in the work item type of the process.
     *
     * @param hideStateModel -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    hideStateDefinition(hideStateModel: WorkItemTrackingProcessDefinitions.HideStateModel, processId: string, witRefName: string, stateId: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>;
    /**
     * Updates a given state definition in the work item type of the process.
     *
     * @param stateModel -
     * @param processId - ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - ID of the state
     */
    updateStateDefinition(stateModel: WorkItemTrackingProcessDefinitions.WorkItemStateInputModel, processId: string, witRefName: string, stateId: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemStateResultModel>;
    /**
     * Adds a behavior to the work item type of the process.
     *
     * @param behavior -
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    addBehaviorToWorkItemType(behavior: WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior, processId: string, witRefNameForBehaviors: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior>;
    /**
     * Returns a behavior for the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     * @param behaviorRefName - The reference name of the behavior
     */
    getBehaviorForWorkItemType(processId: string, witRefNameForBehaviors: string, behaviorRefName: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior>;
    /**
     * Returns a list of all behaviors for the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    getBehaviorsForWorkItemType(processId: string, witRefNameForBehaviors: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior[]>;
    /**
     * Removes a behavior for the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     * @param behaviorRefName - The reference name of the behavior
     */
    removeBehaviorFromWorkItemType(processId: string, witRefNameForBehaviors: string, behaviorRefName: string): Promise<void>;
    /**
     * Updates default work item type for the behavior of the process.
     *
     * @param behavior -
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    updateBehaviorToWorkItemType(behavior: WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior, processId: string, witRefNameForBehaviors: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeBehavior>;
    /**
     * Creates a work item type in the process.
     *
     * @param workItemType -
     * @param processId - The ID of the process
     */
    createWorkItemType(workItemType: WorkItemTrackingProcessDefinitions.WorkItemTypeModel, processId: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel>;
    /**
     * Removes a work item type in the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    deleteWorkItemType(processId: string, witRefName: string): Promise<void>;
    /**
     * Returns a work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param expand -
     */
    getWorkItemType(processId: string, witRefName: string, expand?: WorkItemTrackingProcessDefinitions.GetWorkItemTypeExpand): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel>;
    /**
     * Returns a list of all work item types in the process.
     *
     * @param processId - The ID of the process
     * @param expand -
     */
    getWorkItemTypes(processId: string, expand?: WorkItemTrackingProcessDefinitions.GetWorkItemTypeExpand): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel[]>;
    /**
     * Updates a work item type of the process.
     *
     * @param workItemTypeUpdate -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    updateWorkItemType(workItemTypeUpdate: WorkItemTrackingProcessDefinitions.WorkItemTypeUpdateModel, processId: string, witRefName: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeModel>;
    /**
     * Adds a field to the work item type in the process.
     *
     * @param field -
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for the field
     */
    addFieldToWorkItemType(field: WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2, processId: string, witRefNameForFields: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2>;
    /**
     * Returns a single field in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     * @param fieldRefName - The reference name of the field
     */
    getWorkItemTypeField(processId: string, witRefNameForFields: string, fieldRefName: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2>;
    /**
     * Returns a list of all fields in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     */
    getWorkItemTypeFields(processId: string, witRefNameForFields: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2[]>;
    /**
     * Removes a field in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     * @param fieldRefName - The reference name of the field
     */
    removeFieldFromWorkItemType(processId: string, witRefNameForFields: string, fieldRefName: string): Promise<void>;
    /**
     * Updates a single field in the scope of the given process and work item type.
     *
     * @param field - The model with which to update the field
     * @param processId - The ID of the process
     * @param witRefNameForFields - Work item type reference name for fields
     */
    updateWorkItemTypeField(field: WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2, processId: string, witRefNameForFields: string): Promise<WorkItemTrackingProcessDefinitions.WorkItemTypeFieldModel2>;
}
