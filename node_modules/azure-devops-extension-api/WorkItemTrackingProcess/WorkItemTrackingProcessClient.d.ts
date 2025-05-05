import { IVssRestClientOptions } from "../Common/Context";
import { RestClientBase } from "../Common/RestClientBase";
import * as WorkItemTrackingProcess from "../WorkItemTrackingProcess/WorkItemTrackingProcess";
export declare class WorkItemTrackingProcessRestClient extends RestClientBase {
    constructor(options: IVssRestClientOptions);
    static readonly RESOURCE_AREA_ID: string;
    /**
     * Creates a single behavior in the given process.
     *
     * @param behavior -
     * @param processId - The ID of the process
     */
    createProcessBehavior(behavior: WorkItemTrackingProcess.ProcessBehaviorCreateRequest, processId: string): Promise<WorkItemTrackingProcess.ProcessBehavior>;
    /**
     * Removes a behavior in the process.
     *
     * @param processId - The ID of the process
     * @param behaviorRefName - The reference name of the behavior
     */
    deleteProcessBehavior(processId: string, behaviorRefName: string): Promise<void>;
    /**
     * Returns a behavior of the process.
     *
     * @param processId - The ID of the process
     * @param behaviorRefName - The reference name of the behavior
     * @param expand -
     */
    getProcessBehavior(processId: string, behaviorRefName: string, expand?: WorkItemTrackingProcess.GetBehaviorsExpand): Promise<WorkItemTrackingProcess.ProcessBehavior>;
    /**
     * Returns a list of all behaviors in the process.
     *
     * @param processId - The ID of the process
     * @param expand -
     */
    getProcessBehaviors(processId: string, expand?: WorkItemTrackingProcess.GetBehaviorsExpand): Promise<WorkItemTrackingProcess.ProcessBehavior[]>;
    /**
     * Replaces a behavior in the process.
     *
     * @param behaviorData -
     * @param processId - The ID of the process
     * @param behaviorRefName - The reference name of the behavior
     */
    updateProcessBehavior(behaviorData: WorkItemTrackingProcess.ProcessBehaviorUpdateRequest, processId: string, behaviorRefName: string): Promise<WorkItemTrackingProcess.ProcessBehavior>;
    /**
     * Creates a control in a group.
     *
     * @param control - The control.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group to add the control to.
     */
    createControlInGroup(control: WorkItemTrackingProcess.Control, processId: string, witRefName: string, groupId: string): Promise<WorkItemTrackingProcess.Control>;
    /**
     * Moves a control to a specified group.
     *
     * @param control - The control.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group to move the control to.
     * @param controlId - The ID of the control.
     * @param removeFromGroupId - The group ID to remove the control from.
     */
    moveControlToGroup(control: WorkItemTrackingProcess.Control, processId: string, witRefName: string, groupId: string, controlId: string, removeFromGroupId?: string): Promise<WorkItemTrackingProcess.Control>;
    /**
     * Removes a control from the work item form.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group.
     * @param controlId - The ID of the control to remove.
     */
    removeControlFromGroup(processId: string, witRefName: string, groupId: string, controlId: string): Promise<void>;
    /**
     * Updates a control on the work item form.
     *
     * @param control - The updated control.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param groupId - The ID of the group.
     * @param controlId - The ID of the control.
     */
    updateControl(control: WorkItemTrackingProcess.Control, processId: string, witRefName: string, groupId: string, controlId: string): Promise<WorkItemTrackingProcess.Control>;
    /**
     * Adds a field to a work item type.
     *
     * @param field -
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    addFieldToWorkItemType(field: WorkItemTrackingProcess.AddProcessWorkItemTypeFieldRequest, processId: string, witRefName: string): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField>;
    /**
     * Returns a list of all fields in a work item type.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    getAllWorkItemTypeFields(processId: string, witRefName: string): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField[]>;
    /**
     * Returns a field in a work item type.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param fieldRefName - The reference name of the field.
     * @param expand -
     */
    getWorkItemTypeField(processId: string, witRefName: string, fieldRefName: string, expand?: WorkItemTrackingProcess.ProcessWorkItemTypeFieldsExpandLevel): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField>;
    /**
     * Removes a field from a work item type. Does not permanently delete the field.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param fieldRefName - The reference name of the field.
     */
    removeWorkItemTypeField(processId: string, witRefName: string, fieldRefName: string): Promise<void>;
    /**
     * Updates a field in a work item type.
     *
     * @param field -
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param fieldRefName - The reference name of the field.
     */
    updateWorkItemTypeField(field: WorkItemTrackingProcess.UpdateProcessWorkItemTypeFieldRequest, processId: string, witRefName: string, fieldRefName: string): Promise<WorkItemTrackingProcess.ProcessWorkItemTypeField>;
    /**
     * Adds a group to the work item form.
     *
     * @param group - The group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page to add the group to.
     * @param sectionId - The ID of the section to add the group to.
     */
    addGroup(group: WorkItemTrackingProcess.Group, processId: string, witRefName: string, pageId: string, sectionId: string): Promise<WorkItemTrackingProcess.Group>;
    /**
     * Moves a group to a different page and section.
     *
     * @param group - The updated group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page the group is in.
     * @param sectionId - The ID of the section the group is i.n
     * @param groupId - The ID of the group.
     * @param removeFromPageId - ID of the page to remove the group from.
     * @param removeFromSectionId - ID of the section to remove the group from.
     */
    moveGroupToPage(group: WorkItemTrackingProcess.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string, removeFromPageId: string, removeFromSectionId: string): Promise<WorkItemTrackingProcess.Group>;
    /**
     * Moves a group to a different section.
     *
     * @param group - The updated group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page the group is in.
     * @param sectionId - The ID of the section the group is in.
     * @param groupId - The ID of the group.
     * @param removeFromSectionId - ID of the section to remove the group from.
     */
    moveGroupToSection(group: WorkItemTrackingProcess.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string, removeFromSectionId: string): Promise<WorkItemTrackingProcess.Group>;
    /**
     * Removes a group from the work item form.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page the group is in
     * @param sectionId - The ID of the section to the group is in
     * @param groupId - The ID of the group
     */
    removeGroup(processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): Promise<void>;
    /**
     * Updates a group in the work item form.
     *
     * @param group - The updated group.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param pageId - The ID of the page the group is in.
     * @param sectionId - The ID of the section the group is in.
     * @param groupId - The ID of the group.
     */
    updateGroup(group: WorkItemTrackingProcess.Group, processId: string, witRefName: string, pageId: string, sectionId: string, groupId: string): Promise<WorkItemTrackingProcess.Group>;
    /**
     * Gets the form layout.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    getFormLayout(processId: string, witRefName: string): Promise<WorkItemTrackingProcess.FormLayout>;
    /**
     * Creates a picklist.
     *
     * @param picklist - Picklist
     */
    createList(picklist: WorkItemTrackingProcess.PickList): Promise<WorkItemTrackingProcess.PickList>;
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
    getList(listId: string): Promise<WorkItemTrackingProcess.PickList>;
    /**
     * Returns meta data of the picklist.
     *
     */
    getListsMetadata(): Promise<WorkItemTrackingProcess.PickListMetadata[]>;
    /**
     * Updates a list.
     *
     * @param picklist -
     * @param listId - The ID of the list
     */
    updateList(picklist: WorkItemTrackingProcess.PickList, listId: string): Promise<WorkItemTrackingProcess.PickList>;
    /**
     * Adds a page to the work item form.
     *
     * @param page - The page.
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    addPage(page: WorkItemTrackingProcess.Page, processId: string, witRefName: string): Promise<WorkItemTrackingProcess.Page>;
    /**
     * Removes a page from the work item form
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param pageId - The ID of the page
     */
    removePage(processId: string, witRefName: string, pageId: string): Promise<void>;
    /**
     * Updates a page on the work item form
     *
     * @param page - The page
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    updatePage(page: WorkItemTrackingProcess.Page, processId: string, witRefName: string): Promise<WorkItemTrackingProcess.Page>;
    /**
     * Creates a process.
     *
     * @param createRequest - CreateProcessModel.
     */
    createNewProcess(createRequest: WorkItemTrackingProcess.CreateProcessModel): Promise<WorkItemTrackingProcess.ProcessInfo>;
    /**
     * Removes a process of a specific ID.
     *
     * @param processTypeId -
     */
    deleteProcessById(processTypeId: string): Promise<void>;
    /**
     * Edit a process of a specific ID.
     *
     * @param updateRequest -
     * @param processTypeId -
     */
    editProcess(updateRequest: WorkItemTrackingProcess.UpdateProcessModel, processTypeId: string): Promise<WorkItemTrackingProcess.ProcessInfo>;
    /**
     * Get list of all processes including system and inherited.
     *
     * @param expand -
     */
    getListOfProcesses(expand?: WorkItemTrackingProcess.GetProcessExpandLevel): Promise<WorkItemTrackingProcess.ProcessInfo[]>;
    /**
     * Get a single process of a specified ID.
     *
     * @param processTypeId -
     * @param expand -
     */
    getProcessByItsId(processTypeId: string, expand?: WorkItemTrackingProcess.GetProcessExpandLevel): Promise<WorkItemTrackingProcess.ProcessInfo>;
    /**
     * Adds a rule to work item type in the process.
     *
     * @param processRuleCreate -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    addProcessWorkItemTypeRule(processRuleCreate: WorkItemTrackingProcess.CreateProcessRuleRequest, processId: string, witRefName: string): Promise<WorkItemTrackingProcess.ProcessRule>;
    /**
     * Removes a rule from the work item type in the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param ruleId - The ID of the rule
     */
    deleteProcessWorkItemTypeRule(processId: string, witRefName: string, ruleId: string): Promise<void>;
    /**
     * Returns a single rule in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param ruleId - The ID of the rule
     */
    getProcessWorkItemTypeRule(processId: string, witRefName: string, ruleId: string): Promise<WorkItemTrackingProcess.ProcessRule>;
    /**
     * Returns a list of all rules in the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    getProcessWorkItemTypeRules(processId: string, witRefName: string): Promise<WorkItemTrackingProcess.ProcessRule[]>;
    /**
     * Updates a rule in the work item type of the process.
     *
     * @param processRule -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param ruleId - The ID of the rule
     */
    updateProcessWorkItemTypeRule(processRule: WorkItemTrackingProcess.UpdateProcessRuleRequest, processId: string, witRefName: string, ruleId: string): Promise<WorkItemTrackingProcess.ProcessRule>;
    /**
     * Creates a state definition in the work item type of the process.
     *
     * @param stateModel -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    createStateDefinition(stateModel: WorkItemTrackingProcess.WorkItemStateInputModel, processId: string, witRefName: string): Promise<WorkItemTrackingProcess.WorkItemStateResultModel>;
    /**
     * Removes a state definition in the work item type of the process.
     *
     * @param processId - ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - ID of the state
     */
    deleteStateDefinition(processId: string, witRefName: string, stateId: string): Promise<void>;
    /**
     * Returns a single state definition in a work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    getStateDefinition(processId: string, witRefName: string, stateId: string): Promise<WorkItemTrackingProcess.WorkItemStateResultModel>;
    /**
     * Returns a list of all state definitions in a work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    getStateDefinitions(processId: string, witRefName: string): Promise<WorkItemTrackingProcess.WorkItemStateResultModel[]>;
    /**
     * Hides a state definition in the work item type of the process.Only states with customizationType:System can be hidden.
     *
     * @param hideStateModel -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - The ID of the state
     */
    hideStateDefinition(hideStateModel: WorkItemTrackingProcess.HideStateModel, processId: string, witRefName: string, stateId: string): Promise<WorkItemTrackingProcess.WorkItemStateResultModel>;
    /**
     * Updates a given state definition in the work item type of the process.
     *
     * @param stateModel -
     * @param processId - ID of the process
     * @param witRefName - The reference name of the work item type
     * @param stateId - ID of the state
     */
    updateStateDefinition(stateModel: WorkItemTrackingProcess.WorkItemStateInputModel, processId: string, witRefName: string, stateId: string): Promise<WorkItemTrackingProcess.WorkItemStateResultModel>;
    /**
     * Deletes a system control modification on the work item form.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param controlId - The ID of the control.
     */
    deleteSystemControl(processId: string, witRefName: string, controlId: string): Promise<WorkItemTrackingProcess.Control[]>;
    /**
     * Gets edited system controls for a work item type in a process. To get all system controls (base + edited) use layout API(s)
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    getSystemControls(processId: string, witRefName: string): Promise<WorkItemTrackingProcess.Control[]>;
    /**
     * Updates/adds a system control on the work item form.
     *
     * @param control -
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     * @param controlId - The ID of the control.
     */
    updateSystemControl(control: WorkItemTrackingProcess.Control, processId: string, witRefName: string, controlId: string): Promise<WorkItemTrackingProcess.Control>;
    /**
     * Creates a work item type in the process.
     *
     * @param workItemType -
     * @param processId - The ID of the process on which to create work item type.
     */
    createProcessWorkItemType(workItemType: WorkItemTrackingProcess.CreateProcessWorkItemTypeRequest, processId: string): Promise<WorkItemTrackingProcess.ProcessWorkItemType>;
    /**
     * Removes a work item type in the process.
     *
     * @param processId - The ID of the process.
     * @param witRefName - The reference name of the work item type.
     */
    deleteProcessWorkItemType(processId: string, witRefName: string): Promise<void>;
    /**
     * Returns a single work item type in a process.
     *
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     * @param expand - Flag to determine what properties of work item type to return
     */
    getProcessWorkItemType(processId: string, witRefName: string, expand?: WorkItemTrackingProcess.GetWorkItemTypeExpand): Promise<WorkItemTrackingProcess.ProcessWorkItemType>;
    /**
     * Returns a list of all work item types in a process.
     *
     * @param processId - The ID of the process
     * @param expand - Flag to determine what properties of work item type to return
     */
    getProcessWorkItemTypes(processId: string, expand?: WorkItemTrackingProcess.GetWorkItemTypeExpand): Promise<WorkItemTrackingProcess.ProcessWorkItemType[]>;
    /**
     * Updates a work item type of the process.
     *
     * @param workItemTypeUpdate -
     * @param processId - The ID of the process
     * @param witRefName - The reference name of the work item type
     */
    updateProcessWorkItemType(workItemTypeUpdate: WorkItemTrackingProcess.UpdateProcessWorkItemTypeRequest, processId: string, witRefName: string): Promise<WorkItemTrackingProcess.ProcessWorkItemType>;
    /**
     * Adds a behavior to the work item type of the process.
     *
     * @param behavior -
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    addBehaviorToWorkItemType(behavior: WorkItemTrackingProcess.WorkItemTypeBehavior, processId: string, witRefNameForBehaviors: string): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior>;
    /**
     * Returns a behavior for the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     * @param behaviorRefName - The reference name of the behavior
     */
    getBehaviorForWorkItemType(processId: string, witRefNameForBehaviors: string, behaviorRefName: string): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior>;
    /**
     * Returns a list of all behaviors for the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    getBehaviorsForWorkItemType(processId: string, witRefNameForBehaviors: string): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior[]>;
    /**
     * Removes a behavior for the work item type of the process.
     *
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     * @param behaviorRefName - The reference name of the behavior
     */
    removeBehaviorFromWorkItemType(processId: string, witRefNameForBehaviors: string, behaviorRefName: string): Promise<void>;
    /**
     * Updates a behavior for the work item type of the process.
     *
     * @param behavior -
     * @param processId - The ID of the process
     * @param witRefNameForBehaviors - Work item type reference name for the behavior
     */
    updateBehaviorToWorkItemType(behavior: WorkItemTrackingProcess.WorkItemTypeBehavior, processId: string, witRefNameForBehaviors: string): Promise<WorkItemTrackingProcess.WorkItemTypeBehavior>;
}
